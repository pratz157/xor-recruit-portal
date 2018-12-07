package com.hackathon.recruitmentassistant.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.recruitmentassistant.model.Candidate;

@RestController
@RequestMapping("/recruitmentassistant")
public class CandidateController {
	
	@PostMapping("/candidate")
	public Candidate createNewUser(@Valid @RequestBody Candidate candidate){
		
		return candidate;
		
	}

}
