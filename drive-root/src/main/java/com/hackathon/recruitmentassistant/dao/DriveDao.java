package com.hackathon.recruitmentassistant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.model.Drive;

@Repository
public interface DriveDao extends JpaRepository<Drive,Long>{

}
