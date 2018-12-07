package com.hackathon.recruitmentassistant.model;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name="drive")
public class Drive {
	
	private long id;
	private Date createdAt;
	private Date scheduledAt;
	private Date updatedAt;
	private Skill skill;
	private Set<Candidate> candidates;
	private Set<Admin> pannel;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "drive_id")
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	@Column(name = "created_at", nullable = false)
    @CreatedDate
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	@Column(name = "scheduled_at", nullable = false)
	public Date getScheduledAt() {
		return scheduledAt;
	}
	public void setScheduledAt(Date scheduledAt) {
		this.scheduledAt = scheduledAt;
	}
	
	@Column(name = "updated_at", nullable = false)
    @CreatedDate
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	
	@OneToOne
	@JoinColumn(name="skill_id")
	public Skill getSkill() {
		return skill;
	}
	public void setSkill(Skill skill) {
		this.skill = skill;
	}
	
	@OneToMany(mappedBy="drive")
	public Set<Candidate> getCandidates() {
		return candidates;
	}
	public void setCandidates(Set<Candidate> candidates) {
		this.candidates = candidates;
	}
	
	@OneToMany(mappedBy="drive")
	public Set<Admin> getPannel() {
		return pannel;
	}
	public void setPannel(Set<Admin> pannel) {
		this.pannel = pannel;
	}
	
	
}
