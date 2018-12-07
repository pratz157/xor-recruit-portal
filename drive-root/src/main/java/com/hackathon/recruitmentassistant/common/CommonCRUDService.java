package com.hackathon.recruitmentassistant.common;

import java.util.List;

public interface CommonCRUDService<E> {

	E save(E e);
	
	E getById(long id);
	
	List<E> getAll();
}
