package com.nhat.scm.ScmServer.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the cus_order database table.
 * 
 */
@Entity
@Table(name="cus_order")
@NamedQuery(name="CusOrder.findAll", query="SELECT c FROM CusOrder c")
public class CusOrder implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="CUS_ORDER_ID_GENERATOR" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="CUS_ORDER_ID_GENERATOR")
	private int id;

	@Column(name="air_ground")
	private int airGround;

	private double cube;

	private String customer;

	private int day;

	private int hour;

	@Column(name="no_of_packages")
	private int noOfPackages;

	@Column(name="product_no")
	private int productNo;

	private double weight;

	public CusOrder() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getAirGround() {
		return this.airGround;
	}

	public void setAirGround(int airGround) {
		this.airGround = airGround;
	}

	public double getCube() {
		return this.cube;
	}

	public void setCube(double cube) {
		this.cube = cube;
	}

	public String getCustomer() {
		return this.customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public int getDay() {
		return this.day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getHour() {
		return this.hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public int getNoOfPackages() {
		return this.noOfPackages;
	}

	public void setNoOfPackages(int noOfPackages) {
		this.noOfPackages = noOfPackages;
	}

	public int getProductNo() {
		return this.productNo;
	}

	public void setProductNo(int productNo) {
		this.productNo = productNo;
	}

	public double getWeight() {
		return this.weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

}