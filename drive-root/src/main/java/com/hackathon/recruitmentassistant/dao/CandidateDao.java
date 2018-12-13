package com.hackathon.recruitmentassistant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.model.Candidate;

@Repository
public interface CandidateDao extends JpaRepository<Candidate,Long>{

}
