package com.launchacademy.reviews.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
public class Review {
  @Id
  @SequenceGenerator(name = "review_generator", sequenceName = "reviews_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Integer id;

  @NotNull(message = "is empty")
  @Column(name = "star_rating", nullable = false)
  private Integer starRating;

  @Column(name = "description")
  private String description;

  @ManyToOne
  @JoinColumn(name = "film_id", nullable = false)
  @JsonIgnoreProperties("reviews")
  private Film film;
}
