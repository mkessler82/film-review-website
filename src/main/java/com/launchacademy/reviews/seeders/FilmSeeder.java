package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.Film;
import com.launchacademy.reviews.models.Genre;
import com.launchacademy.reviews.services.FilmService;
import com.launchacademy.reviews.services.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class FilmSeeder {
  private FilmService filmService;
  private GenreService genreService;

  @Autowired
  public FilmSeeder(FilmService filmService, GenreService genreService) {
    this.filmService = filmService;
    this.genreService = genreService;
  }

  public void seed() {
    if (filmService.findAll().size() == 0) {
      Optional<Genre> horror = genreService.findById(1);
      Optional<Genre> drama = genreService.findById(2);
      Optional<Genre> adventure = genreService.findById(3);
      Optional<Genre> fantasy = genreService.findById(4);
      Optional<Genre> romance = genreService.findById(5);
      Optional<Genre> scifi = genreService.findById(6);

      Film f1 = new Film();
      f1.setTitle("Friday the 13th");
      f1.setImgUrl("/images/friday.jpg");
      f1.setYear(2009);
      f1.setDescription("Against the advice of locals and police, Clay (Jared Padalecki) scours the eerie woods surrounding Crystal Lake for his missing sister. But the rotting cabins of an abandoned summer camp are not the only things he finds. Hockey-masked killer Jason Voorhees lies in wait for a chance to use his razor-sharp machete on Clay and the group of college students who have come to the forest to party.");
      f1.setGenre(horror.get());

      Film f2 = new Film();
      f2.setTitle("Frankenstein");
      f2.setImgUrl("/images/frank.jpg");
      f2.setYear(1931);
      f2.setDescription("This iconic horror film follows the obsessed scientist Dr. Henry Frankenstein (Colin Clive) as he attempts to create life by assembling a creature from body parts of the deceased. Aided by his loyal misshapen assistant, Fritz (Dwight Frye), Frankenstein succeeds in animating his monster (Boris Karloff), but, confused and traumatized, it escapes into the countryside and begins to wreak havoc. Frankenstein searches for the elusive being, and eventually must confront his tormented creation.");
      f2.setGenre(horror.get());

      Film f3 = new Film();
      f3.setTitle("Flight");
      f3.setImgUrl("/images/flight.jpg");
      f3.setYear(2012);
      f3.setDescription("Commercial airline pilot Whip Whitaker (Denzel Washington) has a problem with drugs and alcohol, though so far he's managed to complete his flights safely. His luck runs out when a disastrous mechanical malfunction sends his plane hurtling toward the ground. Whip pulls off a miraculous crash-landing that results in only six lives lost. Shaken to the core, Whip vows to get sober -- but when the crash investigation exposes his addiction, he finds himself in an even worse situation.");
      f3.setGenre(drama.get());

      Film f4 = new Film();
      f4.setTitle("The English Patient");
      f4.setImgUrl("/images/english.jpg");
      f4.setYear(1996);
      f4.setDescription("The sweeping expanses of the Sahara are the setting for a passionate love affair in this adaptation of Michael Ondaatje's novel. A badly burned man, Laszlo de Almasy (Ralph Fiennes), is tended to by a nurse, Hana (Juliette Binoche), in an Italian monastery near the end of World War II. His past is revealed through flashbacks involving a married Englishwoman (Kristin Scott Thomas) and his work mapping the African landscape. Hana learns to heal her own scars as she helps the dying man.");
      f4.setGenre(drama.get());

      Film f5 = new Film();
      f5.setTitle("Indiana Jones");
      f5.setImgUrl("/images/indiana-jones.jpg");
      f5.setYear(1981);
      f5.setDescription("archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.");
      f5.setGenre(adventure.get());

      Film f6 = new Film();
      f6.setTitle("The Goonies");
      f6.setImgUrl("/images/goonies.jpg");
      f6.setYear(1985);
      f6.setDescription("Old-fashioned yarn about a band of adventurous kids who take on the might of a property developing company which plans to destroy their home to build a country club. When the children discover an old pirate map in the attic, they follow it into an underground cavern in search of lost treasure but come up against plenty of dangerous obstacles along the way.");
      f6.setGenre(adventure.get());

      Film f7 = new Film();
      f7.setTitle(" The Lord of The Rings, The Fellowship of the Ring");
      f7.setImgUrl("/images/lord.jpg");
      f7.setYear(2001);
      f7.setDescription("The future of civilization rests in the fate of the One Ring, which has been lost for centuries. Powerful forces are unrelenting in their search for it. But fate has placed it in the hands of a young Hobbit named Frodo Baggins (Elijah Wood), who inherits the Ring and steps into legend. A daunting task lies ahead for Frodo when he becomes the Ringbearer - to destroy the One Ring in the fires of Mount Doom where it was forged.");
      f7.setGenre(fantasy.get());

      Film f8 = new Film();
      f8.setTitle("Willow");
      f8.setImgUrl("/images/willow.jpg");
      f8.setYear(1988);
      f8.setDescription("Enter the world of \"Willow.\" Journey to the far corners of your imagination, to a land of myth and magic, where dream and reality live side by side ... to a place that never existed, a time that never was. It is a world where a young man named Willow lives out an adventure that explodes beyond the boundaries of his own hopes and fears.");
      f8.setGenre(fantasy.get());

      Film f9 = new Film();
      f9.setTitle("Titanic");
      f9.setImgUrl("/images/titanic.jpg");
      f9.setYear(1997);
      f9.setDescription("James Cameron's \"Titanic\" is an epic, action-packed romance set against the ill-fated maiden voyage of the R.M.S. Titanic; the pride and joy of the White Star Line and, at the time, the largest moving object ever built. She was the most luxurious liner of her era -- the \"ship of dreams\" -- which ultimately carried over 1,500 people to their death in the ice cold waters of the North Atlantic in the early hours of April 15, 1912.");
      f9.setGenre(romance.get());

      Film f10 = new Film();
      f10.setTitle("The Notebook");
      f10.setImgUrl("/images/notebook.jpg");
      f10.setYear(2004);
      f10.setDescription("In 1940s South Carolina, mill worker Noah Calhoun (Ryan Gosling) and rich girl Allie (Rachel McAdams) are desperately in love. But her parents don't approve. When Noah goes off to serve in World War II, it seems to mark the end of their love affair. In the interim, Allie becomes involved with another man (James Marsden). But when Noah returns to their small town years later, on the cusp of Allie's marriage, it soon becomes clear that their romance is anything but over.");
      f10.setGenre(romance.get());

      Film f11 = new Film();
      f11.setTitle("2001: A Space Odyssey");
      f11.setImgUrl("/images/2001.jpg");
      f11.setYear(1968);
      f11.setDescription("An imposing black structure provides a connection between the past and the future in this enigmatic adaptation of a short story by revered sci-fi author Arthur C. Clarke. When Dr. Dave Bowman (Keir Dullea) and other astronauts are sent on a mysterious mission, their ship's computer system, HAL, begins to display increasingly strange behavior, leading up to a tense showdown between man and machine that results in a mind-bending trek through space and time.");
      f11.setGenre(scifi.get());

      Film f12 = new Film();
      f12.setTitle("Blade Runner: The Final Cut");
      f12.setImgUrl("/images/runner.jpg");
      f12.setYear(1982);
      f12.setDescription("Deckard (Harrison Ford) is forced by the police Boss (M. Emmet Walsh) to continue his old job as Replicant Hunter. His assignment: eliminate four escaped Replicants from the colonies who have returned to Earth. Before starting the job, Deckard goes to the Tyrell Corporation and he meets Rachel (Sean Young), a Replicant girl he falls in love with.");
      f12.setGenre(scifi.get());

      Film f13 = new Film();
      f13.setTitle("Mad Max: Fury Road");
      f13.setImgUrl("/images/max.jpg");
      f13.setYear(2015);
      f13.setDescription("In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.");
      f13.setGenre(adventure.get());

      Film f14 = new Film();
      f14.setTitle("Back To The Future");
      f14.setImgUrl("/images/bttf.jpg");
      f14.setYear(1985);
      f14.setDescription("Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.");
      f14.setGenre(adventure.get());

      Film f15 = new Film();
      f15.setTitle("Mission Impossible");
      f15.setImgUrl("/images/impossible.jpg");
      f15.setYear(1996);
      f15.setDescription("An American agent, under false suspicion of disloyalty, must discover and expose the real spy without the help of his organization.");
      f15.setGenre(adventure.get());

      filmService.save(f1);
      filmService.save(f2);
      filmService.save(f3);
      filmService.save(f4);
      filmService.save(f5);
      filmService.save(f6);
      filmService.save(f7);
      filmService.save(f8);
      filmService.save(f9);
      filmService.save(f10);
      filmService.save(f11);
      filmService.save(f12);
      filmService.save(f13);
      filmService.save(f14);
      filmService.save(f15);
    }
  }
}

