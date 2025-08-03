import React, { useState } from 'react'
import { supabase } from '../../client';

export default function CommentForm({comments, setComments, id}) {
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        setIsSubmittingComment(true);

        const { data: { user } } = await supabase.auth.getUser();
            const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();
        
        // Simulate API call
        setTimeout( async () => {
        const comment = {
            author: `${profile.username}`, // Replace with actual current user
            content: newComment,
            date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
            likes: 0
        };

        await supabase
        .from('Posts')
        .update({comments: [...comments, comment]})
        .eq('id', id)
        
        setComments(prev => [...prev, comment]);
        setNewComment('');
        setIsSubmittingComment(false);
        }, 500);
    };


  return (
    <div className="comment-form">
        <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="comment-input"
        rows="3"
        disabled={isSubmittingComment}
        />
        <button 
        onClick={handleCommentSubmit}
        className="comment-submit-button"
        disabled={!newComment.trim() || isSubmittingComment}
        >
        {isSubmittingComment ? 'Posting...' : 'Post Comment'}
        </button>
    </div>
  )
}
