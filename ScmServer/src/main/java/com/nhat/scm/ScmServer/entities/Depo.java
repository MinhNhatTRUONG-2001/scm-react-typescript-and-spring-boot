package com.nhat.scm.ScmServer.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the depo database table.
 * 
 */
@Entity
@NamedQuery(name="Depo.findAll", query="SELECT d FROM Depo d")
public class Depo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="DEPO_ID_GENERATOR" )
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="DEPO_ID_GENERATOR")
	private int id;

	@Column(name="product_name")
	private String productName;

	@Column(name="warehouse_1")
	private int warehouse1;

	@Column(name="warehouse_2")
	private int warehouse2;

	@Column(name="warehouse_3")
	private int warehouse3;

	public Depo() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getProductName() {
		return this.productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getWarehouse1() {
		return this.warehouse1;
	}

	public void setWarehouse1(int warehouse1) {
		this.warehouse1 = warehouse1;
	}

	public int getWarehouse2() {
		return this.warehouse2;
	}

	public void setWarehouse2(int warehouse2) {
		this.warehouse2 = warehouse2;
	}

	public int getWarehouse3() {
		return this.warehouse3;
	}

	public void setWarehouse3(int warehouse3) {
		this.warehouse3 = warehouse3;
	}

}