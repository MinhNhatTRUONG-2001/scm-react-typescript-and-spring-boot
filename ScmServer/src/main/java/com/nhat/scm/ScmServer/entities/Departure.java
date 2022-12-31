package com.nhat.scm.ScmServer.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the departure database table.
 * 
 */
@Entity
@NamedQuery(name="Departure.findAll", query="SELECT d FROM Departure d")
public class Departure implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="DEPARTURE_ID_GENERATOR" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="DEPARTURE_ID_GENERATOR")
	private int id;

	private String destination;

	private String origin;

	@Temporal(TemporalType.TIMESTAMP)
	private Date time;

	private int unit;

	public Departure() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDestination() {
		return this.destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getOrigin() {
		return this.origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public Date getTime() {
		return this.time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public int getUnit() {
		return this.unit;
	}

	public void setUnit(int unit) {
		this.unit = unit;
	}

}