package com.hackathon.recruitmentassistant.dao;

import java.util.List;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.model.Candidate;

public interface CandidateDao extends CommonCRUDService<Candidate>{

	List<Candidate> getCandidateListForPanel(long pannelId);
}
