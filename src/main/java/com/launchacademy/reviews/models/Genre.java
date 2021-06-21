package com.launchacademy.reviews.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "genres")
@Getter
@Setter
@NoArgsConstructor
public class Genre {
  @Id
  @SequenceGenerator(name = "genre_generator", sequenceName = "genres_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "genre_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Integer id;

  @Column(name = "name")
  private String name;

  @Column(name = "img_url")
  private String imgUrl;
}
