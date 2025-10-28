import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-viagem-form',
  standalone: false,
  templateUrl: './viagem-form.html',
  styleUrl: './viagem-form.css',
})
export class ViagemForm {
  reservaForm!: FormGroup; 
  
  destinosDisponiveis = ["Paris", "Nova York", "Tóquio", "Rio de Janeiro"];
  formEnviado = false;
  
  private localStorageKey = 'dadosReservaViagem';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reservaForm = this.fb.group({

      destino: ['', [Validators.required]],
      dataIda: ['', [Validators.required]],
      dataVolta: ['', [Validators.required]],
      
      numeroPassageiros: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],
      
      emailContato: ['', [
        Validators.required,
        Validators.email
      ]]
    });

    // --- FUNCIONALIDADES DE LOCALSTORAGE ---

    this.carregarDadosSalvos();

    this.iniciarAutoSave();
  }

  carregarDadosSalvos(): void {
    const dadosSalvos = localStorage.getItem(this.localStorageKey);
    if (dadosSalvos) {
      this.reservaForm.patchValue(JSON.parse(dadosSalvos));
    }
  }

  iniciarAutoSave(): void {
    this.reservaForm.valueChanges.subscribe(valor => {
      localStorage.setItem(this.localStorageKey, JSON.stringify(valor));
    });
  }

  get destino() { return this.reservaForm.get('destino'); }
  get dataIda() { return this.reservaForm.get('dataIda'); }
  get dataVolta() { return this.reservaForm.get('dataVolta'); }
  get numeroPassageiros() { return this.reservaForm.get('numeroPassageiros'); }
  get emailContato() { return this.reservaForm.get('emailContato'); }


  onSubmit(): void {
  
    this.formEnviado = true;
    this.reservaForm.markAllAsTouched();

    if (this.reservaForm.invalid) {
      return;
    }

    console.log("Formulário enviado com sucesso!");
    console.log(this.reservaForm.value);
    
    this.reservaForm.reset();
    this.formEnviado = false; 
  }
}