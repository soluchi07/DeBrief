import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../client';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    fandom: '',
    episode: null,
    season: null,
    spoiler: false,
    ismovie: false
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isOwner, setIsOwner] = useState(false);

  // Fetch the post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        // if (!user) {
        //   navigate('/login');
        //   return;
        // }

        // Fetch the post
        const { data: post, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (!post) {
          setMessage({ type: 'error', text: 'Post not found' });
          return;
        }

        // Get user's profile to check ownership
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        // Check if current user owns this post
        if (post.username !== profile?.username) {
          setMessage({ type: 'error', text: 'You can only edit your own posts' });
          setIsOwner(false);
          return;
        }

        setIsOwner(true);
        
        // Populate form with existing data
        setFormData({
          title: post.title || '',
          description: post.description || '',
          image: post.image || '',
          fandom: post.fandom || '',
          episode: post.episode,
          season: post.season,
          spoiler: post.spoiler || false,
          ismovie: post.ismovie || false
        });

      } catch (error) {
        console.error('Error fetching post:', error);
        setMessage({ type: 'error', text: 'Error loading post data' });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'number') {
      if (value === '') {
        setFormData(prev => ({
          ...prev,
          [name]: null
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: parseInt(value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOwner) return;
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('Posts')
        .update({
          title: formData.title,
          description: formData.description || null,
          image: formData.image || null,
          fandom: formData.fandom || null,
          episode: formData.episode,
          season: formData.season,
          spoiler: formData.spoiler,
          ismovie: formData.ismovie
        })
        .eq('id', id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Post updated successfully!' });
      
      // Redirect back to the post or home page after a delay
      setTimeout(() => {
        navigate(`/home/${id}`);
      }, 1500);

    } catch (error) {
      console.error('Error updating post:', error);
      setMessage({ type: 'error', text: 'There was an error updating the post' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading post data...</p>
      </div>
    );
  }

  // Error state or not owner
  if (!isOwner) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>Access Denied</h2>
          <p style={{ marginBottom: '2rem' }}>{message.text || 'You do not have permission to edit this post.'}</p>
          <button 
            onClick={() => navigate('/home')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: 'none',
              backgroundColor: 'var(--primary)',
              color: 'white'
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      color: 'var(--text)',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      <div style={{
        backgroundColor: 'var(--background)',
        border: '2px solid var(--secondary)',
        borderRadius: '12px',
        padding: '2rem',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          color: 'var(--primary)',
          marginBottom: '1.5rem',
          textAlign: 'center',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          Edit Post
        </h1>
        
        {message.text && (
          <div style={{
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontWeight: '500',
            backgroundColor: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? '#22c55e' : '#ef4444',
            border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`
          }}>
            {message.text}
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontWeight: '600',
              color: 'var(--text)',
              fontSize: '0.9rem'
            }}>
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="What's your post about?"
              style={{
                padding: '0.75rem',
                border: '2px solid var(--secondary)',
                borderRadius: '8px',
                backgroundColor: 'var(--background)',
                color: 'var(--text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--secondary)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontWeight: '600',
              color: 'var(--text)',
              fontSize: '0.9rem'
            }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Tell us more..."
              style={{
                padding: '0.75rem',
                border: '2px solid var(--secondary)',
                borderRadius: '8px',
                backgroundColor: 'var(--background)',
                color: 'var(--text)',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--secondary)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontWeight: '600',
                color: 'var(--text)',
                fontSize: '0.9rem'
              }}>
                Fandom
              </label>
              <input
                type="text"
                name="fandom"
                value={formData.fandom}
                onChange={handleInputChange}
                placeholder="e.g., Marvel, Harry Potter"
                style={{
                  padding: '0.75rem',
                  border: '2px solid var(--secondary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{
                fontWeight: '600',
                color: 'var(--text)',
                fontSize: '0.9rem'
              }}>
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                style={{
                  padding: '0.75rem',
                  border: '2px solid var(--secondary)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--background)',
                  color: 'var(--text)',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="checkbox"
              name="ismovie"
              checked={formData.ismovie}
              onChange={handleInputChange}
              style={{
                width: '1.2rem',
                height: '1.2rem',
                accentColor: 'var(--accent)'
              }}
            />
            <label style={{
              fontWeight: 'normal',
              color: 'var(--text)',
              cursor: 'pointer'
            }}>
              This is a movie
            </label>
          </div>
        
          {!formData.ismovie &&
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  fontWeight: '600',
                  color: 'var(--text)',
                  fontSize: '0.9rem'
                }}>
                  Season
                </label>
                <input
                  type="number"
                  name="season"
                  value={formData.season || ''}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="1"
                  style={{
                    padding: '0.75rem',
                    border: '2px solid var(--secondary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--secondary)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  fontWeight: '600',
                  color: 'var(--text)',
                  fontSize: '0.9rem'
                }}>
                  Episode
                </label>
                <input
                  type="number"
                  name="episode"
                  value={formData.episode || ''}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="1"
                  style={{
                    padding: '0.75rem',
                    border: '2px solid var(--secondary)',
                    borderRadius: '8px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(86, 168, 215, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--secondary)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          }

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input
              type="checkbox"
              name="spoiler"
              checked={formData.spoiler}
              onChange={handleInputChange}
              style={{
                width: '1.2rem',
                height: '1.2rem',
                accentColor: 'var(--accent)'
              }}
            />
            <label style={{
              fontWeight: 'normal',
              color: 'var(--text)',
              cursor: 'pointer'
            }}>
              This post contains spoilers
            </label>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
            marginTop: '1rem'
          }}>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: 'transparent',
                color: 'var(--text)',
                border: '2px solid var(--secondary)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--secondary)';
                e.target.style.color = 'var(--background)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--text)';
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
                cursor: isSubmitting || !formData.title ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                border: 'none',
                backgroundColor: 'var(--primary)',
                color: 'white',
                opacity: isSubmitting || !formData.title ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && formData.title) {
                  e.target.style.backgroundColor = 'var(--accent)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && formData.title) {
                  e.target.style.backgroundColor = 'var(--primary)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isSubmitting ? 'Updating...' : 'Update Post'}
            </button>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
