import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {
  @Input() inputValue = '';
  isDropdownVisible = false;
  showAbove = false;
  hasSelected = false

  @Input() options: any[] = []; // Typage pour un tableau d'options
  @Input() displayProperty = 'name.firstname'; // La propriété à afficher dans les `li`
  
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  filteredOptions: any[] = [];

  constructor(private elRef: ElementRef) {}

  @HostListener('window:resize')
  onWindowResize() {
    this.checkDropdownPosition();
  }

  @HostListener('document:click', ['$event']) // Écoute des clics sur le document
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownContainer = this.elRef.nativeElement.querySelector('.dropdown-container');

    // Vérifie si le clic a eu lieu à l'extérieur du dropdown
    if (dropdownContainer && !dropdownContainer.contains(target)) {
      this.isDropdownVisible = false; // Ferme le dropdown
    }
  }

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.filteredOptions = this.options; // Mettre à jour les options filtrées si l'input change
    }
  }

  onInputFocus() {
    this.isDropdownVisible = true;
    this.checkDropdownPosition();
  }

  onInputBlur() {
    // Laisser la gestion du focus et du blur à la logique de clic externe
  }

  // Fonction pour accéder à une sous-propriété dynamique
  getPropertyValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  onInputChange(event: any) {
    this.hasSelected = false
    this.inputValue = event.target.value.toLowerCase();

    // Filtrage des options en fonction de la propriété imbriquée
    this.filteredOptions = this.options.filter(option =>
      this.getPropertyValue(option, this.displayProperty).toLowerCase().includes(this.inputValue)
    );

    this.checkDropdownPosition();
    this.inputChange.emit(this.inputValue); // Émet l'événement avec la valeur de l'input
  }

  selectOption(option: any) {
    this.hasSelected = true

    this.inputValue = this.getPropertyValue(option, this.displayProperty); // Utilise la sous-propriété
    this.inputChange.emit(this.inputValue); // Émet la valeur sélectionnée
    this.isDropdownVisible = false; // Ferme le dropdown après sélection
  }

  checkDropdownPosition() {
    const dropdownContainer = this.elRef.nativeElement.querySelector('.dropdown-container') as HTMLElement;
    const inputRect = dropdownContainer.getBoundingClientRect();
    const dropdownHeight = 200; // Hauteur maximale de la liste déroulante

    const spaceBelow = window.innerHeight - inputRect.bottom + window.scrollY; // Ajout de window.scrollY pour le défilement
    const spaceAbove = inputRect.top + window.scrollY; // Ajout de window.scrollY pour le défilement

    // Si l'espace en dessous est suffisant pour afficher le dropdown, on le met en dessous
    if (spaceBelow >= dropdownHeight) {
      this.showAbove = false;
    } 
    // Si l'espace au-dessus est suffisant, on affiche la liste au-dessus
    else if (spaceAbove >= dropdownHeight) {
      this.showAbove = true;
    } 
    // Sinon, on garde par défaut l'affichage en dessous
    else {
      this.showAbove = spaceBelow < spaceAbove;
    }
  }
}
