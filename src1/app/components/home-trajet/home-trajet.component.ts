import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/Model/Reservation';

@Component({
  selector: 'app-home-trajet',
  templateUrl: './home-trajet.component.html',
  styleUrls: ['./home-trajet.component.css']
})
export class HomeTrajetComponent implements OnInit {
 @Input() reservations: Reservation[]
 LastReservation:Reservation
 FutureReservations:Reservation []

  constructor() { }

  ngOnInit(): void {
    console.log(this.reservations[0])
    this.LastReservation = this.getLastReservation()
    this.FutureReservations = this.getFutureReservations()
  }

  getLastReservation(reservations: Reservation[] = this.reservations): Reservation | null {
    // Obtenez la date actuelle
    const currentDate = new Date();
  
    // Initialisez la réservation la plus proche pour les dates ultérieures
    let closestReservationFuture = null;
    let closestTimeDifferenceFuture = Infinity;
  
    // Initialisez la réservation la plus proche pour les dates antérieures
    let closestReservationPast = null;
    let closestTimeDifferencePast = Infinity;
  
    // Parcourez le tableau
    for (const reservation of reservations) {
      const startingDate = new Date(reservation.starting_date);
      //@ts-ignore
      const timeDifference = startingDate - currentDate;
  
      if (timeDifference > 0 && timeDifference < closestTimeDifferenceFuture) {
        // Si la différence de temps est positive (c'est-à-dire que la réservation est dans le futur)
        // et que la différence de temps est inférieure à la plus petite différence trouvée jusqu'à présent
        closestReservationFuture = reservation;
        closestTimeDifferenceFuture = timeDifference;
      } else if (timeDifference < 0 && -timeDifference < closestTimeDifferencePast) {
        // Si la différence de temps est négative (c'est-à-dire que la réservation est dans le passé)
        // et que la différence de temps absolue est inférieure à la plus petite différence trouvée jusqu'à présent
        closestReservationPast = reservation;
        closestTimeDifferencePast = -timeDifference;
      }
    }
  
    // Priorité aux réservations avec des dates ultérieures, sinon utilisez celles avec des dates antérieures
    const finalReservation = closestReservationFuture //|| closestReservationPast;
  
    console.log('finalReservation ', finalReservation);
    return finalReservation;
  }
  
  getFutureReservations(reservations = this.reservations) {
    const currentDate = new Date();
    
    const futureReservations = reservations.filter(reservation =>
        new Date(reservation.starting_date) > currentDate
    );

    return futureReservations;
}

}
