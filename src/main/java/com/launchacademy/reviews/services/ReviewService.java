package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.ReviewRepository;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
  private ReviewRepository reviewRepository;

  @Autowired
  public ReviewService(ReviewRepository reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public List<Review> findAllReviews(Pageable pageable){
    return (List<Review>) reviewRepository.findAll(pageable);
  }

  public Review save(Review review){
    return reviewRepository.save(review);
  }

  public Optional<Review> findById (Integer id){
    return reviewRepository.findById(id);
  }

  public void deleteReview(Integer id) {
    reviewRepository.deleteById(id);
  }

  public List<Review> findAll() {
    return (List<Review>) reviewRepository.findAll();
  }
}
