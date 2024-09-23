import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_FOR_API } from 'src/global';
import { Reservation } from 'src/app/model/Model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = SERVER_FOR_API// 'https://premiersurinternet.fr/seo_back/public/api'; // URL de votre API

  constructor(private http: HttpClient) { }
  sendMail(data: any): Observable<any> {
    // Logique pour effectuer l'inscription sur votre backend
    // alert(`${this.apiUrl}/envoyer-mail`)
    return this.http.post<any>(`${this.apiUrl}envoyer-mail`, data);
  }
  sendMailScheduleEmail(data: any): Observable<any> {
    // Logique pour effectuer l'inscription sur votre backend
    // alert(`${this.apiUrl}/envoyer-mail`)
    return this.http.post<any>(`${this.apiUrl}schedule-email`, data);
  }

  getAdminTextFOrReservation(    departureDate: string, 
    departurePoint: string, 
    destinationDate: string, 
    destinationPoint: string, 
    amount: string, 
    take_at_home_adr: string, 
    take_at_home: boolean, 
    departurePointTitle?: string, 
    destinationPointTitle?: string, 
  ){
    console.log('tAHHHHH ',take_at_home)
    return  `
    
    
    
    
    
    

    <p><strong>Dear passenger,</strong></p>
<p><span style="color: #0000ff;"><strong>[Fran&ccedil;ais en dessous]</strong></span></p>
<p><strong><br /> </strong><strong><em>Your reservation has been taken into account; however, i</em></strong><strong>t will be confirmed upon receipt of the proof of transfer to the following account&nbsp; :<br /></strong><strong><span style="color: #3366ff;"><br /></span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong><strong><u><br /></u></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p>
<p><strong>Send the proof on the emai<u>l</u></strong>&nbsp;&nbsp;<a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a>&nbsp;<strong>With&nbsp; the reservation name<br /><br /></strong></p>
<p><strong>-&gt;If you decide to pay in cash, to confirm your reservation also send a message to&nbsp;&nbsp;<a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a>&nbsp;</strong></p>
<p><strong>With&nbsp; the reservation name and the note "<span style="text-decoration: underline;">I am paying with cash."&nbsp;</span>&nbsp;Please note that paying cash incur an additional fee of &euro;5.&nbsp;</strong></p>
<h3><span style="text-decoration: underline; color: #ff0000;"><strong><br />You must do it within a</strong> maximum <strong>of one hour,&nbsp;otherwise your reservation may be cancelled.</strong></span></h3>
<h3>&nbsp;</h3>
<p>&nbsp;</p>
<h1 style="text-align: center;"><strong>Information</strong></h1>
<h4><em><br /></em> <em><em>Your departure address is</em><em>&nbsp;from&nbsp;</em><em>${departurePointTitle} stop</em><strong><em>: ${departurePoint} &nbsp; the ${departureDate}<br /></em></strong></em> <em><strong><em>Your arrival addres is &nbsp;</em></strong></em><em>${destinationPointTitle} stop<strong>: ${destinationPoint}</strong></em><em><strong>&nbsp; the ${destinationDate}.</strong></em><strong><em><strong><em><br /><br /></em></strong></em></strong></h4>
<p><strong><em><strong><em>You&nbsp;</em></strong>can check the departure and arrival addresses in the section &lsquo;My Current trip' on your Besomewhereapp.com account.&nbsp;<br /><br /></em></strong></p>
<p><span style="color: #ff0000;"><strong><em><u>We remind you that it is mandatory for the passenger to be present precisely at the address mentioned up to 10 minutes before the scheduled departure time.</u></em></strong></span></p>
<p><strong><em>You must be in front of the address before the driver arrives; <span style="color: #ff0000;">otherwise, he will not be able to pick you up. The driver is not authorized to wait for the passenger as it would cause delays for all passengers</span>. It is your responsibility to ensure that you can be reached by local phone number</em> <em>WhatsApp, Telegram, or Signal</em> <em>&nbsp;:</em></strong></p>
<h4><strong><em>If your starting point is an airport or a train station,</em></strong> <span style="text-decoration: underline;"><a href="https://besomewhereapp.com/#/served-routes" target="_blank"><em>click here for more information<br /></em></a></span><br /> <strong>We remind you that Besomewhere is not in control of the traffic; it cannot be held responsible for traffic slowdowns or road closures. It is the responsibility of the traveler to allow for sufficient margin with the time of their fligh.<br /></strong></h4>
<h4><strong><em>We also remind passengers that it is recommended to allow for a margin of at least one hour between the landing time of the flight and the</em></strong> <em>departure time of the Besomewhere transport. Besomewhere must start on time without any condition, in order to avoid accumulating</em> <em>delays. The passenger may then be accommodated for the next departure, provided if there is a available seat and if the delay can be proven due to a flight-related reason.<br /></em></h4>
<h4><strong>&nbsp;</strong><strong><em>You can find our sales, support, and cancellation policy in our</em> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank"><em>general terms and conditions of sale</em></a><em><br /></em> <br /></strong><strong>And especially to not forget anything, use our <a href="https://besomewhereapp.com/#/checklist/creation?title=&amp;with_baby=false&amp;country0=&amp;city0=&amp;begindate0=&amp;enddate0=&amp;id0=0" target="_blank">help to pack your suitcase</a></strong><br /> &nbsp;</h4>
<p><strong><em>For any questions, please contact&nbsp;</em></strong><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a><strong><u>&nbsp;</u></strong></p>
<h4><br /> <strong>Wherever you are, Besomewhere is with you</strong><br /> <strong>Besomewhere</strong></h4>
<h4><strong>&nbsp;</strong></h4>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">[Fran&ccedil;ais] </span></strong></p>
<p><strong><span style="color: #0000ff;">Cher passagers,<br />Votre r&eacute;servation a &eacute;t&eacute; prise en compte, cependant elle sera confirm&eacute;e d&egrave;s la r&eacute;ception de la preuve de virement &nbsp;sur le compte&nbsp; suivant :</span><br /><br /><br /></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong><strong><u><br /></u></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p>
<p style="text-align: left;"><strong><span style="color: #800000;"><span style="color: #0000ff;">Envoyer la preuve sur l&rsquo;email</span> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a>&nbsp;<span style="color: #0000ff;">avec le nom de la r&eacute;servation.</span></span></strong></p>
<p><strong>&nbsp;<span style="color: #0000ff;">-&gt;Si vous payez avec du cash, pour confirmer votre r&eacute;servation, envoyez aussi un message &agrave;</span>&nbsp;<a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a></strong></p>
<p><strong><span style="color: #0000ff;">En Indiquant le nom de la r&eacute;servation avec la mention &laquo; je paie en cash &raquo;.&nbsp;&nbsp;Veuillez noter que le paiement en esp&egrave;ces entra&icirc;ne des frais suppl&eacute;mentaires de 5 &euro;.</span><br /><br /></strong></p>
<h3><span style="text-decoration: underline; color: #ff0000;"><strong>&nbsp;Vous devez le faire dans un d&eacute;lai de maximum une heure,&nbsp;&nbsp;sous&nbsp; peine de voir votre r&eacute;servation annul&eacute;.</strong></span></h3>
<p>&nbsp;</p>
<h1 style="text-align: center;"><strong>Information</strong></h1>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Votre adresse de d&eacute;part est ${departurePointTitle} stop: ${departurePoint}  le ${departureDate}<br /><strong>Votre adresse d'arriv&eacute; est </strong><strong>${destinationPointTitle} stop: ${destinationPoint}  le ${destinationDate}&nbsp;<br /><br /></strong></strong></span></p>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Il vous est possible de consulter l&rsquo;adresse de d&eacute;part&nbsp; et d&rsquo;arriv&eacute; dans la rubrique &laquo;&nbsp;Mes trajets en cours&nbsp;&raquo; sur votre compte Besomewhereapp.com</strong></span></p>
<p><span style="color: #0000ff;"><strong>&nbsp;</strong></span></p>
<p><span style="color: #ff0000;"><strong><u>Nous rappelons qu&rsquo;il&nbsp; est obligatoire pour le passager de se pr&eacute;senter pr&eacute;cis&eacute;ment devant&nbsp; l&rsquo;adresse mentionn&eacute; jusqu&rsquo;&agrave; 10 minutes avant l&rsquo;heure de passage.</u></strong></span></p>
<p><span style="color: #ff0000;"><strong>&nbsp;</strong></span></p>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">Vous devez &ecirc;tre devant l&rsquo;adresse avant l&rsquo;arriv&eacute;e du conducteur,</span> <span style="color: #ff0000;">autrement il ne pourra pas vous r&eacute;cup&eacute;rer. &nbsp;Le conducteur n&rsquo;a aucune autorisation pour attendre le passager car cela occasionnera du retard pour tous les passagers</span><span style="color: #0000ff;">. Il est de votre responsabilit&eacute; de vous assurer <u>d&rsquo;&ecirc;tre joignable avec un num&eacute;ro local, whattaps, telegram ou signal.</u></span></strong></p>
<p>&nbsp;</p>
<h4><strong><span style="color: #0000ff;">Si votre point de d&eacute;part est un a&eacute;roport /gare</span> <a href="https://besomewhereapp.com/#/served-routes" target="_blank">Cliquez ici pour plus d&rsquo;informations</a></strong></h4>
<h4><span style="color: #0000ff;">Nous rappelons que Besomewhere n&rsquo;est pas maitre de la route, il ne pourra &ecirc;tre tenu responsable pour&nbsp; un ralentissement de la circulation ou une route ferm&eacute;. Il est de la responsabilit&eacute; du voyageur de prendre suffisamment de marge avec l&rsquo;heure de son vol.</span></h4>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Nous rappelons &eacute;galement qu'Il est recommand&eacute; pour le passager de prendre une marge d&rsquo;au moins une heure entre l&rsquo;heure d&rsquo;atterrissage du vol et l&rsquo;heure de d&eacute;part du transport Besomewhere qui devra sans condition d&eacute;marrer &agrave; l&rsquo;heure, dans le but de ne pas accumuler de retard. Le passager pourra alors &ecirc;tre r&eacute;cup&eacute;r&eacute; pour le prochain d&eacute;part &agrave; condition d&rsquo;avoir une place de disponible si le retard peut &ecirc;tre prouv&eacute; pour cause de vol.</strong></span><br /><br /></p>
<h4><strong><span style="color: #0000ff;">Vous pouvez retrouver notre politique de vente, de prise en charge et d&rsquo;annulation dans nos</span> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank">conditions de vente g&eacute;n&eacute;rales</a></strong></h4>
<h4><strong><span style="color: #0000ff;">Et surtout pour ne rien oubliez utiliser notre</span> <a href="https://besomewhereapp.com/#/checklist/creation?title=&amp;with_baby=false&amp;country0=&amp;city0=&amp;begindate0=&amp;enddate0=&amp;id0=0" target="_blank">aide pour faire votre valise</a>,</strong></h4>
<p><span style="color: #0000ff;"><strong>Pour toute question adressez-vous&nbsp; &agrave; </strong></span><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a></p>
<h4><span style="color: #0000ff;"><strong>Partout o&ugrave; vous &ecirc;tes il y&rsquo;a Besomewhere avec vous</strong></span></h4>
<h4><span style="color: #0000ff;">&nbsp;BESOMEWHERE</span></h4>
    `;
    
  }
  getAdminTextFOrReservationComeToMyDoor1(departureDate: string, 
    departurePoint: string, 
    destinationDate: string, 
    destinationPoint: string, 
    amount: string, 
    take_at_home_adr: string){
    return  `<p><strong>Dear passenger,</strong></p><p><span style="color: #0000ff;"><strong>[Fran&ccedil;ais en dessous]</strong></span></p><p><strong><br /></strong><strong><em>Your reservation has been taken into account; however, it will be confirmed upon receipt of the proof of transfer to the following account:</em></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p><p><strong>Send the proof on the email</strong> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a> <strong>With the reservation name<br /><br /></strong></p><p><strong>-&gt;If you decide to pay in cash, to confirm your reservation also send a message to </strong><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a><strong> With the reservation name and the note "<span style="text-decoration: underline;">I am paying with cash."</span> Please note that paying cash incur an additional fee of &euro;5.</strong></p><h3><span style="text-decoration: underline; color: #ff0000;"><strong><br />You must do it within a maximum of one hour, otherwise your reservation may be cancelled.</strong></span></h3><h1 style="text-align: center;"><strong>Information</strong></h1><h4><em>Your departure address is from ${departurePoint} the ${departureDate}<br />Your arrival address is  ${destinationPoint} the ${destinationDate}.</em></h4><p><strong>Since you have selected the option "come to my door", we will pick you up or drop you off at ${take_at_home_adr}.<span style="color: #ff0000;"> In case of pick-up be sure to be ready up to 15 minutes before the initial schedule time.</span></strong></p><p><strong>You can check the departure and arrival addresses in the section &lsquo;My Current trip' on your Besomewhereapp.com account.</strong></p><p><strong>You will receive an automatic message up to 15 minutes before the driver arrives.</strong></p><h4><strong>You must be in front of the address before the driver arrives; <span style="color: #ff0000;">otherwise, he will not be able to pick you up. The driver is not authorized to wait for the passenger as it would cause delays for all passengers.</span> It is your responsibility to ensure that you can be reached by local phone number, WhatsApp, Telegram, or Signal.</strong></h4><h4><strong>If your starting point is an airport or a train station,</strong> <span style="text-decoration: underline;"><a href="https://besomewhereapp.com/#/served-routes" target="_blank"><em>click here for more information</em></a></span></h4><h4><strong>We remind you that Besomewhere is not in control of the traffic; it cannot be held responsible for traffic slowdowns or road closures. It is the responsibility of the traveler to allow for sufficient margin with the time of their flight.</strong></h4><h4><strong>We also remind passengers that it is recommended to allow for a margin of at least one hour between the landing time of the flight and the departure time of the Besomewhere transport. Besomewhere must start on time without any condition, in order to avoid accumulating delays. The passenger may then be accommodated for the next departure, provided if there is a available seat and if the delay can be proven due to a flight-related reason.</strong></h4><h4><strong>You can find our sales, support, and cancellation policy in our <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank">general terms and conditions of sale</a>.</strong></h4><h4><strong>And especially to not forget anything, use our <a href="https://besomewhereapp.com/#/checklist/creation?title=&with_baby=false&country0=&city0=&begindate0=&enddate0=&id0=0" target="_blank">help to pack your suitcase</a>.</strong></h4><p><strong>For any questions, please contact </strong><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a></p><h4><strong>Wherever you are, Besomewhere is with you.</strong></h4><h4><strong>Besomewhere</strong></h4><p><strong><span style="color: #0000ff;">[Fran&ccedil;ais]</span></strong></p><p><strong><span style="color: #0000ff;">Cher passagers,<br />Votre r&eacute;servation a &eacute;t&eacute; prise en compte, cependant elle sera confirm&eacute;e d&egrave;s la r&eacute;ception de la preuve de virement sur le compte suivant :</span><br /><br /></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong></p><p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p><p style="text-align: left;"><strong><span style="color: #800000;"><span style="color: #0000ff;">Envoyer la preuve sur l&rsquo;email</span> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a> <span style="color: #0000ff;">avec le nom de la r&eacute;servation.</span></span></strong></p><p><strong><span style="color: #0000ff;">-&gt;Si vous payez avec du cash, pour confirmer votre r&eacute;servation, envoyez aussi un message &agrave;</span> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a></p><p><strong><span style="color: #0000ff;">En Indiquant le nom de la r&eacute;servation avec la mention &laquo; je paie en cash &raquo;. Veuillez noter que le paiement en esp&egrave;ces entra&icirc;ne des frais suppl&eacute;mentaires de 5 &euro;.</span></strong></p><h3><span style="text-decoration: underline; color: #ff0000;"><strong>&nbsp;Vous devez le faire dans un d&eacute;lai de maximum une heure, sous peine de voir votre r&eacute;servation annul&eacute;.</strong></span></h3><h1 style="text-align: center;"><strong>Information</strong></h1><p><span style="color: #0000ff;"><strong>Votre adresse de d&eacute;part est ${departurePoint} le ${departureDate}<br />Votre adresse d'arriv&eacute; est ${destinationPoint} le ${destinationDate}.</strong></span></p><p><span style="color: #0000ff;"><strong>Comme vous avez choisi l'option &laquo; venir &agrave; ma porte &raquo;, nous viendrons vous chercher ou vous d&eacute;poser &agrave; ${take_at_home_adr}. Dans le cas de prise en charge, veillez &agrave;<span style="color: #ff0000;"> &ecirc;tre pr&ecirc;t jusqu'&agrave; 15 minutes avant l'heure pr&eacute;vue.</span></strong></span></p><p><span style="color: #0000ff;"><strong>Il vous est possible de consulter l&rsquo;adresse de d&eacute;part et d&rsquo;arriv&eacute; dans la rubrique &laquo; Mes trajets en cours &raquo; sur votre compte Besomewhereapp.com</strong></span></p><p><span style="color: #0000ff;"><strong>Vous recevrez un message automatique jusqu&rsquo;&agrave; 15 minutes avant l&rsquo;arriv&eacute;e du chauffeur.</strong></span></p><h4><span style="color: #0000ff;"><strong>Vous devez &ecirc;tre devant l'adresse avant l&rsquo;arriv&eacute;e du chauffeur ; <span style="color: #ff0000;">sans quoi il ne pourra pas vous prendre en charge. Le chauffeur n&rsquo;est pas autoris&eacute; &agrave; attendre le passager au risque de causer des retards pour tous les passagers.</span></strong></span></h4><p><span style="color: #0000ff;"><strong>Il vous incombe de vous assurer que vous pouvez &ecirc;tre joignable par num&eacute;ro de t&eacute;l&eacute;phone local, WhatsApp, Telegram ou Signal.<br /><br /></strong></span></p><h4><span style="color: #0000ff;"><strong><span style="text-decoration: underline;">Si votre point de d&eacute;part est un a&eacute;roport ou une gare,</span> <a href="https://besomewhereapp.com/#/served-routes" target="_blank"><em>cliquez ici pour plus d&rsquo;information</em></a>.</strong></span></h4><h4><span style="color: #0000ff;"><strong>Nous rappelons que Besomewhere n&rsquo;a pas le contr&ocirc;le sur la circulation; il ne saurait &ecirc;tre tenu pour responsable des ralentissements ou fermetures de routes. Il incombe au voyageur de pr&eacute;voir une marge suffisante avec l&rsquo;heure de leur vol.</strong></span></h4><p><span style="color: #0000ff;"><strong>Nous rappelons &eacute;galement aux passagers qu'il est recommand&eacute; de pr&eacute;voir une marge d'au moins une heure entre l&rsquo;heure d&rsquo;atterrissage du vol et l&rsquo;heure de d&eacute;part du transport Besomewhere. Besomewhere doit partir &agrave; l&rsquo;heure, sans aucune condition, afin d&rsquo;&eacute;viter d&rsquo;accumuler des retards. Le passager peut alors &ecirc;tre pris en charge pour le prochain d&eacute;part, &agrave; condition qu&rsquo;il y ait une place disponible et si le retard peut &ecirc;tre prouv&eacute; pour une raison li&eacute;e au vol.</strong></span></p><p><strong>Vous pouvez trouver nos conditions de vente, de support et d'annulation dans nos <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank"><em>conditions g&eacute;n&eacute;rales de vente.</em></a></strong></p><p><strong>Et surtout, pour ne rien oublier, utilisez notre <a href="https://besomewhereapp.com/#/checklist/creation?title=&with_baby=false&country0=&city0=&begindate0=&enddate0=&id0=0" target="_blank"><em>check-list pour pr&eacute;parer votre valise</em></a>.</strong></p><p><span style="color: #0000ff;"><strong>Pour toutes questions, veuillez contacter </strong></span><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a></p><h4 style="text-align: left;"><strong><span style="color: #0000ff;">L&rsquo;&eacute;quipe Besomewhere<br />O&ugrave; que vous soyez, Besomewhere est avec vous.</span></strong></h4>`;
    
  }
  getAdminTextFOrReservationComeToMyDoor(departureDate: string, 
    departurePoint: string, 
    destinationDate: string, 
    destinationPoint: string, 
    amount: string, 
    take_at_home_adr: string,
    departurePointTitle?: string, 
    destinationPointTitle?: string, 
  ){
    return  `<p><strong>Dear passenger,</strong></p>
<p><span style="color: #0000ff;"><strong>[Fran&ccedil;ais en dessous]</strong></span></p>
<p><strong><br /> </strong><strong><em>Your reservation has been taken into account; however, i</em></strong><strong>t will be confirmed upon receipt of the proof of transfer to the following account&nbsp; :<br /></strong><strong><span style="color: #3366ff;"><br /></span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong><strong><u><br /></u></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p>
<p><strong>Send the proof on the emai<u>l</u></strong>&nbsp;&nbsp;<a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a>&nbsp;<strong>With&nbsp; the reservation name<br /><br /></strong></p>
<p><strong>-&gt;If you decide to pay in cash, to confirm your reservation also send a message to&nbsp;&nbsp;<a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a>&nbsp;</strong></p>
<p><strong>With&nbsp; the reservation name and the note "<span style="text-decoration: underline;">I am paying with cash."&nbsp;</span>&nbsp;Please note that paying cash incur an additional fee of &euro;5.&nbsp;</strong></p>
<h3><span style="text-decoration: underline; color: #ff0000;"><strong><br />You must do it within a</strong> maximum <strong>of one hour,&nbsp;otherwise your reservation may be cancelled.</strong></span></h3>
<h3>&nbsp;</h3>
<p>&nbsp;</p>
<h1 style="text-align: center;"><strong>Information</strong></h1>
<h4><em><br /></em> <em><em>Your departure address is</em><em>&nbsp;from&nbsp;</em><em>${departurePointTitle} stop</em><strong><em>: ${departurePoint} &nbsp; the ${departureDate}<br /></em></strong></em> <em><strong><em>Your arrival addres is &nbsp;</em></strong></em><em>${destinationPointTitle} stop<strong>: ${destinationPoint};</strong></em><em><strong>&nbsp; the ${destinationDate}.</strong></em><em><strong><em><br /></em></strong></em></h4>
<p><strong><em><strong><em>Since you have selected the option "come to my door", we will pick you up or drop you off at ${take_at_home_adr}.<strong><em>&nbsp;In case of pick-up <span style="color: #ff0000;">be sure to be ready up to 15 minutes before the initial schedule time.</span></em></strong><br /><br /></em></strong></em></strong></p>
<p><strong><em><strong><em>You&nbsp;</em></strong>can check the departure and arrival addresses in the section &lsquo;My Current trip' on your Besomewhereapp.com account.&nbsp;</em></strong><span style="text-decoration: underline;"><strong><em><br /></em></strong><br /></span></p>
<p><strong><em>You will receive an automatic message up to 15 minutes before the driver arrives.</em></strong><strong><em><br /></em></strong></p>
<h4><strong><em>You must be in front of the address before the driver arrives; <span style="color: #ff0000;">otherwise, he will not be able to pick you up. The driver is not authorized to wait for the passenger as it would cause delays for all passengers</span>. It is your responsibility to ensure that you can be reached by local phone number</em> <em>WhatsApp, Telegram, or Signal</em> <em>&nbsp;:<br /></em></strong></h4>
<h4><strong><em>If your starting point is an airport or a train station,</em></strong> <span style="text-decoration: underline;"><a href="https://besomewhereapp.com/#/served-routes" target="_blank"><em>click here for more information</em></a></span><br /> <strong>We remind you that Besomewhere is not in control of the traffic; it cannot be held responsible for traffic slowdowns or road closures. It is the responsibility of the traveler to allow for sufficient margin with the time of their fligh.<br /></strong></h4>
<h4><strong><em>We also remind passengers that it is recommended to allow for a margin of at least one hour between the landing time of the flight and the</em></strong> <em>departure time of the Besomewhere transport. Besomewhere must start on time without any condition, in order to avoid accumulating</em> <em>delays. The passenger may then be accommodated for the next departure, provided if there is a available seat and if the delay can be proven due to a flight-related reason.<br /></em></h4>
<h4><strong>&nbsp;</strong><strong><em>You can find our sales, support, and cancellation policy in our</em> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank"><em>general terms and conditions of sale</em></a><em><br /></em> <br /></strong><strong>And especially to not forget anything, use our <a href="https://besomewhereapp.com/#/checklist/creation?title=&amp;with_baby=false&amp;country0=&amp;city0=&amp;begindate0=&amp;enddate0=&amp;id0=0" target="_blank">help to pack your suitcase</a></strong><br /> &nbsp;</h4>
<p><strong><em>For any questions, please contact&nbsp;</em></strong><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a><strong><u>&nbsp;</u></strong></p>
<h4><br /> <strong>Wherever you are, Besomewhere is with you</strong><br /> <strong>Besomewhere</strong></h4>
<h4><strong>&nbsp;</strong></h4>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">[Fran&ccedil;ais] </span></strong></p>
<p><strong><span style="color: #0000ff;">Cher passagers,<br />Votre r&eacute;servation a &eacute;t&eacute; prise en compte, cependant elle sera confirm&eacute;e d&egrave;s la r&eacute;ception de la preuve de virement &nbsp;sur le compte&nbsp; suivant :</span><br /><br /><br /></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Account Name: KAPANGALA</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">IBAN: BE63 9501 1486 5008</span></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">BIC : CTBKBEBX</span></strong><strong><u><br /></u></strong></p>
<p style="text-align: center;"><strong><span style="color: #800000;">Amount: ${amount}</span></strong></p>
<p style="text-align: left;"><strong><span style="color: #800000;"><span style="color: #0000ff;">Envoyer la preuve sur l&rsquo;email</span> <a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a>&nbsp;<span style="color: #0000ff;">avec le nom de la r&eacute;servation.</span></span></strong></p>
<p><strong>&nbsp;<span style="color: #0000ff;">-&gt;Si vous payez avec du cash, pour confirmer votre r&eacute;servation, envoyez aussi un message &agrave;</span>&nbsp;<a href="mailto:besomewhere.reservation@gmail.com">besomewhere.reservation@gmail.com</a></strong></p>
<p><strong><span style="color: #0000ff;">En Indiquant le nom de la r&eacute;servation avec la mention &laquo; je paie en cash &raquo;.&nbsp;&nbsp;Veuillez noter que le paiement en esp&egrave;ces entra&icirc;ne des frais suppl&eacute;mentaires de 5 &euro;.</span><br /><br /></strong></p>
<h3><span style="text-decoration: underline; color: #ff0000;"><strong>&nbsp;Vous devez le faire dans un d&eacute;lai de maximum une heure,&nbsp;&nbsp;sous&nbsp; peine de voir votre r&eacute;servation annul&eacute;.</strong></span></h3>
<p>&nbsp;</p>
<h1 style="text-align: center;"><strong>Information</strong></h1>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Votre adresse de d&eacute;part est ${departurePointTitle} stop: ${departurePoint}  le ${departureDate}<br /><strong>Votre adresse d'arriv&eacute; est </strong><strong>${destinationPointTitle} stop: ${destinationPoint}  le ${destinationDate}&nbsp;</strong></strong></span></p>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Comme vous avez choisi l'option &laquo; venir &agrave; ma porte &raquo;, nous viendrons vous chercher ou vous d&eacute;poser &agrave;&nbsp;${take_at_home_adr}&nbsp;. Dans le cas de prise en charge Veillez &agrave;<span style="color: #ff0000;"> &ecirc;tre pr&ecirc;t jusqu'&agrave; 15 minutes avant l'heure pr&eacute;vue.</span></strong></span></p>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Il vous est possible de consulter l&rsquo;adresse de d&eacute;part&nbsp; et d&rsquo;arriv&eacute; dans la rubrique &laquo;&nbsp;Mes trajets en cours&nbsp;&raquo; sur votre compte Besomewhereapp.com</strong></span></p>
<p><span style="color: #0000ff;"><strong>Vous recevrez un message automatique jusqu'&agrave; 15 minutes avant l'arriv&eacute;e du chauffeur.</strong></span></p>
<p>&nbsp;</p>
<p><strong><span style="color: #0000ff;">Vous devez &ecirc;tre devant l&rsquo;adresse avant l&rsquo;arriv&eacute;e du conducteur,</span> <span style="color: #ff0000;">autrement il ne pourra pas vous r&eacute;cup&eacute;rer. &nbsp;Le conducteur n&rsquo;a aucune autorisation pour attendre le passager car cela occasionnera du retard pour tous les passagers</span><span style="color: #0000ff;">. Il est de votre responsabilit&eacute; de vous assurer <u>d&rsquo;&ecirc;tre joignable avec un num&eacute;ro local, whattaps, telegram ou signal.</u></span></strong></p>
<p>&nbsp;</p>
<h4><strong><span style="color: #0000ff;">Si votre point de d&eacute;part est un a&eacute;roport /gare</span> <a href="https://besomewhereapp.com/#/served-routes" target="_blank">Cliquez ici pour plus d&rsquo;informations</a></strong></h4>
<h4><span style="color: #0000ff;">Nous rappelons que Besomewhere n&rsquo;est pas maitre de la route, il ne pourra &ecirc;tre tenu responsable pour&nbsp; un ralentissement de la circulation ou une route ferm&eacute;. Il est de la responsabilit&eacute; du voyageur de prendre suffisamment de marge avec l&rsquo;heure de son vol.</span></h4>
<p>&nbsp;</p>
<p><span style="color: #0000ff;"><strong>Nous rappelons &eacute;galement qu'Il est recommand&eacute; pour le passager de prendre une marge d&rsquo;au moins une heure entre l&rsquo;heure d&rsquo;atterrissage du vol et l&rsquo;heure de d&eacute;part du transport Besomewhere qui devra sans condition d&eacute;marrer &agrave; l&rsquo;heure, dans le but de ne pas accumuler de retard. Le passager pourra alors &ecirc;tre r&eacute;cup&eacute;r&eacute; pour le prochain d&eacute;part &agrave; condition d&rsquo;avoir une place de disponible si le retard peut &ecirc;tre prouv&eacute; pour cause de vol.</strong></span><br /><br /></p>
<h4><strong><span style="color: #0000ff;">Vous pouvez retrouver notre politique de vente, de prise en charge et d&rsquo;annulation dans nos</span> <a href="https://besomewhereapp.com/#/conditions-de-vente" target="_blank">conditions de vente g&eacute;n&eacute;rales</a></strong></h4>
<h4><strong><span style="color: #0000ff;">Et surtout pour ne rien oubliez utiliser notre</span> <a href="https://besomewhereapp.com/#/checklist/creation?title=&amp;with_baby=false&amp;country0=&amp;city0=&amp;begindate0=&amp;enddate0=&amp;id0=0" target="_blank">aide pour faire votre valise</a>,</strong></h4>
<p><span style="color: #0000ff;"><strong>Pour toute question adressez-vous&nbsp; &agrave; </strong></span><a href="mailto:besomewhere.reservation@gmail.com"><strong>besomewhere.reservation@gmail.com</strong></a></p>
<h4><span style="color: #0000ff;"><strong>Partout o&ugrave; vous &ecirc;tes il y&rsquo;a Besomewhere avec vous</strong></span></h4>
<h4><span style="color: #0000ff;">&nbsp;BESOMEWHERE</span></h4>`;
    
  }

  getSampleReservation() : Reservation{
    return {
      "id": 265,
      "status": 1,
      "for_disabled": false,
      "take_at_home": true,
      "take_to_home_adr": "france",
      "created_at": "2024-08-17 21:41:32",
      "updated_at": "2024-08-17 21:41:32",
      "starting_date": "2025-01-01 01:10:00",
      "arrival_date": "2025-01-01 02:09:00",
      "id_car": "RAV4-A5S",
      "price": 12.5,
      "items": [
          {
              "src": "13966082f56d1992-706729-b07598db9b10de48f8870e40207a4480jpg.jpg",
              "id": 535,
              "name": "Nouilles Poulet / Noodles Chicken",
              "quantity": 1,
              "price": 3,
              "category": 0,
              "sub_category": 1,
              "item_id": 85,
              "reservation_id": 265,
              "created_at": "2024-08-17 21:41:32",
              "updated_at": "2024-08-17 21:41:32"
          }
      ],
      "passengers": [
          {
              "id": 361,
              "first_name": "Nogoh1",
              "last_name": "Brice2",
              "birthday": null,
              "reservation_id": 265,
              "gender": 0,
              "phone": "656343507",
              "email": "bsomkwe@gmail.com",
              "flight_number": "0",
              "created_at": "2024-08-17 21:41:32",
              "updated_at": "2024-08-17 21:41:32"
          }
      ],
      "customer": {
          "id": 49,
          "name": "nilo9",
          "first_name": "Nogoh1",
          "last_name": "Brice2",
          "birthday": "1995-08-28 00:00:00",
          "email": "bsomkwe@gmail.com",
          "email_verified_at": null,
          "phone": "656343507",
          "gender": 0,
          "city": "Rennes",
          "country": "Afghanistan",
          "address": "2 avenue Gutenberg",
          "longitude": -1.67429,
          "lattitude": 48.11198,
          "cur_country": "Cameroun",
          "image": "https://besomewhereapp.com/uploads/1076509f72219ab3-221589-IMG-20230909-WA0026jpg.jpg",
          "joined": true,
          "token": "ISKnPV6f87AxpY74c7mZLB0HlfMPWwmdZqxJC4ZJhQ4LHqUdnKXxLqXURiNq",
          "created_at": "2023-06-15 22:56:46",
          "updated_at": "2023-09-19 19:31:52"
      },
      "points": [
          {
              "id": 155,
              "title": "Trone  Metro Bruxelles",
              "description": "<blockquote class=\"ql-indent-1\"><sub class=\"ql-size-small\"><strong><em>[EN] Imperative information for your trip to read [FR] Informations indispensable pour le voyage</em></strong></sub></blockquote><p><sub class=\"ql-size-small\">[EN] Make sure having enter your complete address, including the city to avoid any mistake</sub></p><ul><li><sub class=\"ql-size-small\">If <strong>you are leaving from your home</strong>, departure adress for <strong>Trône Metro Bruxelles stop </strong>is<strong> Rue Montoyer 4, 1000 Bruxelles</strong></sub><strong class=\"ql-size-small\"> </strong><a href=\"https://maps.app.goo.gl/SSafsVW74k34T8Ds6\" rel=\"noopener noreferrer\" target=\"_blank\" class=\"ql-size-small\"><strong> clic here for google Maps position</strong></a><sub class=\"ql-size-small\"> and destination is the airport or station you have selected </sub></li><li><sub class=\"ql-size-small\"> If <strong>you are landing at airport/station</strong> check the meeting point according your <strong>airport/station by </strong></sub><a href=\"https://besomewhereapp.com/#/served-routes\" rel=\"noopener noreferrer\" target=\"_blank\" class=\"ql-size-small\"><strong> <u>clicking here: Meeting point from airport/station</u></strong></a><span class=\"ql-size-small\">,</span><sub class=\"ql-size-small\"> the final destination for you being <strong>Trône Metro Bruxelles stop Rue Montoyer 4, 1000 Bruxelles</strong></sub></li><li><sub class=\"ql-size-small\"><strong> In the case </strong>you want us<strong> to pick you up or drop you off at your home adress</strong> you may select the option<strong> \"come to my door\"</strong> at the next step after clicking <strong>\"to continue\" </strong></sub></li></ul><blockquote><sub class=\"ql-size-small\"><em><u>Present yourself at the meeting point 10 minutes before the scheduled time of departure</u></em></sub></blockquote><blockquote><sub class=\"ql-size-small\"><strong>-&gt; In the event of a delay upon landing,you will board the next vehicle with free Seat.&nbsp;Otherwise there is a vehicle reserved for delayed flights available every&nbsp;3 hours during service hours. Signal it on besomewhere.reservation@gmail.com</strong></sub></blockquote><p><sub class=\"ql-size-small\">Dear passenger please note that we do not have any departures scheduled before 5:00 AM. In this case, you can take the last taxi at night and rest in one of our relaxation spaces for just €5 until your departure. To take advantage of this offer, send us an email to besomewhere.reservation@gmail.com</sub></p><blockquote><br></blockquote><p><sub class=\"ql-size-small\">[FR] Assurez-vous d'avoir bien renseigné votre adresse complète, y compris la ville, pour éviter toute erreur.</sub></p><ul><li><sub class=\"ql-size-small\">Si <strong>vous partez depuis chez vous</strong> l'adresse de départ pour<strong> l'arrêt Trone&nbsp;Metro Bruxelles </strong>est: <strong>Rue Montoyer 4, 1000 Bruxelles </strong></sub><a href=\"https://maps.app.goo.gl/SSafsVW74k34T8Ds6\" rel=\"noopener noreferrer\" target=\"_blank\" class=\"ql-size-small\"><sub><strong> </strong></sub><strong>cliquez ici pour voir sur google Maps</strong></a><strong class=\"ql-size-small\"> </strong><sub class=\"ql-size-small\">et la destination est l'aéroport ou la gare que vous avez sélectionné.</sub></li><li><sub class=\"ql-size-small\">si <strong>vous atterrissez à l'aéroport/gare</strong>, vérifiez le point de rencontre en fonction de votre aéroport/gare </sub><a href=\"https://besomewhereapp.com/#/served-routes\" rel=\"noopener noreferrer\" target=\"_blank\" class=\"ql-size-small\"><strong><u>en cliquant ici: point de rencontre depuis l'aéroport/station </u></strong></a><sub class=\"ql-size-small\">, la destination finale étant pour vous</sub><strong> </strong><sub class=\"ql-size-small\"><strong>l'arrêt Trone&nbsp;Metro Bruxelles</strong></sub><strong> </strong><sub class=\"ql-size-small\"><strong>Rue Montoyer 4, 1000 Bruxelles </strong></sub></li><li><sub class=\"ql-size-small\"><strong> Dans le cas </strong>où vous souhaitez que <strong>nous venions vous chercher ou vous déposer à votre domicile</strong>, vous pouvez sélectionner l'option<strong> \"Venir à ma porte\" </strong>à l'étape suivante après avoir cliqué sur <strong>\"continuer\"</strong></sub></li></ul><blockquote><sub class=\"ql-size-small\"><em><u>Présentez vous au point de rendez-vous au moins 10 minutes avant l'heure de départ prévu.</u></em></sub></blockquote><blockquote><sub class=\"ql-size-small\"><strong>-&gt;En cas de retard à l’atterrissage, </strong></sub><sub class=\"ql-size-small\" style=\"color: rgb(12, 100, 192);\"><strong>vous prendrez le prochain véhicule avec siège libre. Autrement un&nbsp;véhicule réservé pour les vols retardés est prévu tous les 3 heures&nbsp;</strong></sub><sub class=\"ql-size-small\"><strong> pendant les heures de service. Le signaler sur besomewhere.reservation@gmail.com</strong></sub></blockquote><p><sub class=\"ql-size-small\">Cher passager,Veuillez noter que nous n'avons aucun départ prévu avant 5h00 du matin. Dans ce cas, vous pouvez prendre le dernier taxi dans la nuit et vous reposer dans l'un de nos espaces de détente pour seulement 5 € jusqu'à votre départ. Pour profiter de cette offre, envoyez-nous un email à besomewhere.reservation@gmail.com.</sub></p><p><br></p><blockquote><sub class=\"ql-size-small\"><strong>Around /Autour de </strong></sub><sub class=\"ql-size-small\" style=\"color: rgb(108, 117, 125);\">BESOMEWHERE stop </sub><sub class=\"ql-size-small\"><strong>Trône&nbsp;Metro Bruxelles</strong></sub></blockquote><p><sub class=\"ql-size-small\"><strong><em>Transports&nbsp;</em></strong></sub></p><p><sub class=\"ql-size-small\"><strong><em> </em></strong>Metro M2 M6 -Tram T92 T93 - Bus 12 21 34 38 64 80 95 N06 N08 N11 -Train Station BruxellesLuxembourg IC S5 S7 S8 S9 S19 S81</sub></p><p><sub class=\"ql-size-small\">-</sub></p><p><sub class=\"ql-size-small\">*</sub></p>",
              "image": "request->image",
              "country": "Belgique",
              "city": "Brussels",
              "address": "Rue Montoyer 4, 1000 Bruxelles",
              "code": "request->code",
              "longitude": 4.36753,
              "lattitude": 50.84189,
              "type": "0",
              "parent": 0,
              "is_station": false,
              "created_at": "2023-04-08 20:49:04",
              "updated_at": "2024-08-18 13:30:08"
          },
          {
              "id": 161,
              "title": "Brussels South Charleroi Airport",
              "description": "<blockquote><strong>**Important information related to your trip / Informations importantes liées à votre trajet**</strong></blockquote><p>!Make sure having enter your complete address, including the city to avoid any mistake.</p><p>Assurez-vous d’avoir Encodé votre adresse complète ville compris pour éviter toute erreur!!!</p><p><br></p><h4><strong>This point is either an airport or a train station. You cannot select this point as your departure or destination point here. </strong></h4><h4><strong>It must be selected in the \"Your departure adress\" or \"Select destination\" within section \"Select airport /station\"</strong></h4><p><br></p><h4><strong style=\"color: rgb(13, 13, 13);\">Ce point est soit un aéroport soit une gare , Vous ne pouvez sélectionner ce point comme point d'arrivé ou de départ ici. </strong></h4><h4><strong style=\"color: rgb(13, 13, 13);\">il doit-être sélectionné dans la partie \" Votre point de départ\" ou \"Choisissez votre destination\" avec l'option \"Sélectionez un aéroport/station</strong></h4><h4><br></h4><h4><strong style=\"color: rgb(13, 13, 13);\">Thank you for your understanding</strong></h4><h4><strong>Merci de votre compréhension</strong></h4>",
              "image": "request->image",
              "country": "Belgique",
              "city": "Charleroi",
              "address": "P2 Brussels South Charleroi Airport",
              "code": "request->code",
              "longitude": 4.47606,
              "lattitude": 50.47215,
              "type": "0",
              "parent": 0,
              "is_station": false,
              "created_at": "2023-04-08 21:50:39",
              "updated_at": "2024-03-24 17:10:41"
          }
      ]
  }
  }
}
