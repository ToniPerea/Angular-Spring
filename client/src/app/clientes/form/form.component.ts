import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente( 0,' ',' ',' ',' ');

  titulo: string = "Crear Cliente"

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']

      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado', `Cliente ${cliente.nombre} actualizado con exito!`, 'success')
    })
  }

  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con existo!`, 'success')
      }
    );
  }

}
