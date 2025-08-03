

export default function CommentList({comments}) {
  return (
    <div className="comments-list">
        {comments && comments.map((comment, index) => (
        <div key={index} className="comment">
            <div className="comment-header">
            <span className="comment-author">@{comment.author}</span>
            <span className="comment-date">{comment.date}</span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-actions">
            <button className="comment-like-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>{comment.likes}</span>
            </button>
            </div>
        </div>
        ))}
    </div>
  )
}
