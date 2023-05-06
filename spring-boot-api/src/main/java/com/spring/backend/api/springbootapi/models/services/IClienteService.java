package com.spring.backend.api.springbootapi.models.services;

import com.spring.backend.api.springbootapi.models.entity.Cliente;

import java.util.List;

public interface IClienteService {
    public List<Cliente> findAll();

    public Cliente findById(Long id);

    public Cliente save(Cliente cliente);

    public void delete(Long id);


}
