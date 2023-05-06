package com.spring.backend.api.springbootapi.models.dao;

import com.spring.backend.api.springbootapi.models.entity.Cliente;
import org.springframework.data.repository.CrudRepository;

public interface IClienteDao extends CrudRepository<Cliente, Long> {
}
