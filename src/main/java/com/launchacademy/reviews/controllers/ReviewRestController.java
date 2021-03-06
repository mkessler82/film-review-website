package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.ReviewService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewRestController {
  private ReviewService reviewService;

  @Autowired
  public ReviewRestController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @PutMapping("/{id}")
  public ResponseEntity updateVoteCount (@PathVariable Integer id, @RequestBody Map<String, String> reviewObject){
    Review review = reviewService.findById(id).get();
    review.setVoteCount(Integer.parseInt(reviewObject.get("finalCount")));
    return new ResponseEntity(reviewService.save(review), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public void deleteReview (@PathVariable Integer id) {
    reviewService.deleteReview(id);
  }
}
