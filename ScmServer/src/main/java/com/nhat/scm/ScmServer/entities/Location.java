package com.nhat.scm.ScmServer.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the location database table.
 * 
 */
@Entity
@NamedQuery(name="Location.findAll", query="SELECT l FROM Location l")
public class Location implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="LOCATION_ID_GENERATOR" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="LOCATION_ID_GENERATOR")
	private int id;

	private double lat;

	private double lon;

	@Column(name="max_hr_cap")
	private double maxHrCap;

	private String name;

	private int no;

	@Column(name="processing_cost")
	private double processingCost;

	private double sla;

	public Location() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getLat() {
		return this.lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return this.lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	public double getMaxHrCap() {
		return this.maxHrCap;
	}

	public void setMaxHrCap(double maxHrCap) {
		this.maxHrCap = maxHrCap;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNo() {
		return this.no;
	}

	public void setNo(int no) {
		this.no = no;
	}

	public double getProcessingCost() {
		return this.processingCost;
	}

	public void setProcessingCost(double processingCost) {
		this.processingCost = processingCost;
	}

	public double getSla() {
		return this.sla;
	}

	public void setSla(double sla) {
		this.sla = sla;
	}

}