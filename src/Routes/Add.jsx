import { useState, useEffect } from 'react';
import { supabase } from '../../client';
// import { supabase } from '@supabase/auth-ui-shared';

export default function Add() {
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type == 'number'){
        if (value === ''){
            setFormData(prev => ({
            ...prev,
            [name]: null
            }));
        }
        else{
            setFormData(prev => ({
            ...prev,
            [name]: value
            }));
        }
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call - replace with actual Supabase code
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

        const { error } = await supabase
        .from('Posts')
        .insert({...formData, 'username': profile.username})

        if (error) throw error;
        

      
      setMessage({ type: 'success', text: 'Post created successfully!' });
      setFormData({
        title: '',
        description: '',
        image: '',
        fandom: '',
        episode: '',
        season: '',
        spoiler: false
      })
      window.location = '/home'
    } catch (error) {
      setMessage({ type: 'error', text: `There was an error submitting post :(`});
      console.error(error.message)
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Create New Post
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

        <div onSubmit={handleSubmit} style={{
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
                // disabled={formData.ismovie}
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
                value={formData.episode || ""}
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
          </div>}

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
              onClick={() => window.history.back()}
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
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}