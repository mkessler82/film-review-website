package com.launchacademy.reviews.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.sql.Array;
import java.util.ArrayList;

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

  @NotBlank
  @Column(name = "name", nullable = false)
  private String name;

  @NotBlank
  @Column(name = "img_url", nullable = false)
  private String imgUrl;

  @OneToMany(fetch = FetchType.EAGER, mappedBy = "genre")
  @JsonIgnoreProperties(value = "genre")
  private List<Film> films = new ArrayList<>();

}
