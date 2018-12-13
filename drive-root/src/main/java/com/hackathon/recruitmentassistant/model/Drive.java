package com.hackathon.recruitmentassistant.model;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name="drive")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"createdAt", "updatedAt"},
        allowGetters = true
)
public class Drive {
	
	private long id;
	private Date createdAt;
	private Date scheduledAt;
	private Date updatedAt;
	private Skill skill;
	private Set<Candidate> candidates;
	private Set<Admin> panel;
	
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
	@JsonIgnore
	public Skill getSkill() {
		return skill;
	}
	public void setSkill(Skill skill) {
		this.skill = skill;
	}
	
	@OneToMany(mappedBy="drive")
	@JsonManagedReference
	public Set<Candidate> getCandidates() {
		return candidates;
	}
	public void setCandidates(Set<Candidate> candidates) {
		this.candidates = candidates;
	}
	
	@OneToMany(mappedBy="drive")
	@JsonManagedReference
	public Set<Admin> getPanel() {
		return panel;
	}
	public void setPanel(Set<Admin> pannel) {
		this.panel = pannel;
	}
	
	
}
