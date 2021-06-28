package com.launchacademy.reviews.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@Getter
@Setter
public class FilmForm {

  @NotBlank
  private String title;

  @NotBlank
  private String imgUrl;

  @NotNull
  private Integer year;

  @NotBlank
  private String description;

  @NotNull
  private Integer genreId;

}
