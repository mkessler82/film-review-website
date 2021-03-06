package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/genres", "/genres/{id}", "/films/{id}", "/films/new"})
  public String forward() {
    return "forward:/";
  }
}
