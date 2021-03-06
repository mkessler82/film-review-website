package com.launchacademy.reviews.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

@Entity
@Table(name="films")
@NoArgsConstructor
@Getter
@Setter
public class Film {
  @Id
  @SequenceGenerator(name = "films_generator", sequenceName = "films_id_seq", allocationSize = 1)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "films_generator")
  @Column(name = "id", nullable = false, unique = true)
  private Integer id;

  @NotBlank
  @Column(name = "title", nullable = false)
  private String title;

  @NotBlank
  @Column(name = "img_url", nullable = false)
  private String imgUrl;

  @NotNull
  @Column(name = "year", nullable = false)
  private Integer year;

  @NotBlank
  @Column(name = "description", nullable = false)
  private String description;

  @NotNull
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "genre_id", nullable = false)
  @JsonIgnoreProperties("films")
  private Genre genre;

  @OneToMany(mappedBy = "film", orphanRemoval=true)
  @JsonIgnoreProperties("film")
  private List<Review> reviews;
}
