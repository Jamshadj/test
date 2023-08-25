import { Button } from '@mui/material';
import React, { useState } from 'react';
import { addReview } from '../../../api/userApi';
import Swal from 'sweetalert2';

function Review({ bookingId, userId }) {
    const [starCount, setStarCount] = useState(0);
    const [comment, setComment] = useState('');

    const handleStarClick = (count) => {
        setStarCount(count);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        const reviewData = {
            bookingId,
            userId,
            starCount,
            comment
        };

        addReview(reviewData)
            .then(response => {
                console.log('Review submitted successfully:', response.data);
                // Show success message using SweetAlert2
                Swal.fire('Success', 'Review submitted successfully!', 'success');
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                // You can show an error message here if needed
            });
    };


    return (
        <div>
            {/* Star Rating */}    <h2>Add your review and ratings</h2>
            <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((count) => (
                    <svg
                        key={count}
                        className={`w-6 h-6 ${count <= starCount ? 'text-yellow-300' : 'text-gray-400'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleStarClick(count)}
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                ))}
            </div>

            {/* Comment Textarea */}
            <div className='my-6 '>
                <textarea
                    rows={4}
                    style={{
                        width:"50%",
                        height:"10rem",
                        border: '1px solid black',
                        verticalAlign: 'top',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word'
                    }}
                    value={comment}
                    onChange={handleCommentChange}
                />
            </div>

            {/* Submit Button */}
            <div className='mt-3'>
                <Button variant='contained' color='primary' onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default Review;
