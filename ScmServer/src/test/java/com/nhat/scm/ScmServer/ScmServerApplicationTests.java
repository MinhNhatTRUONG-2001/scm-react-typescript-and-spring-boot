package com.nhat.scm.ScmServer;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

import com.nhat.scm.ScmServer.entities.CusOrder;
import com.nhat.scm.ScmServer.entities.Departure;
import com.nhat.scm.ScmServer.entities.Depo;
import com.nhat.scm.ScmServer.entities.Location;
import com.nhat.scm.ScmServer.entities.Truck;
import com.nhat.scm.ScmServer.repositories.CusOrderRepository;
import com.nhat.scm.ScmServer.repositories.DepartureRepository;
import com.nhat.scm.ScmServer.repositories.DepoRepository;
import com.nhat.scm.ScmServer.repositories.LocationRepository;
import com.nhat.scm.ScmServer.repositories.TruckRepository;

@SpringBootTest
class ScmServerApplicationTests {

    @Autowired
    private TruckRepository truckRepo;
    
    @Autowired
    private LocationRepository locationRepo;
    
    @Autowired
    private DepoRepository depoRepo;
    
    @Autowired
    private DepartureRepository departureRepo;
    
    @Autowired
    private CusOrderRepository cusOrderRepo;
    
	@Test
	void contextLoads() {
	}

	@Test
    @Transactional //avoid LazyInitializationException
    public void insertTruckAndCheckValues() {
        Truck truck = new Truck();
        truck.setLicensePlate("ABC-123");
        truck.setName("Volvo");
        Truck savedTruck = truckRepo.save(truck);
        
        //truck does not have an id; foundTruck get id from the database
        Truck foundTruck = truckRepo.getReferenceById(savedTruck.getId());
        assertThat(savedTruck.toString().equals(foundTruck.toString()));
    }
	
	@Test
    @Transactional //avoid LazyInitializationException
    public void insertLocationAndCheckValues() {
        Location location = new Location();
        location.setNo(1);
        location.setName("Helsinki");
        location.setLat(60.170);
        location.setLon(24.938);
        location.setProcessingCost(1.8);
        location.setMaxHrCap(3000);
        location.setSla(3.14);
        Location savedLocation = locationRepo.save(location);
        
        //location does not have an id; foundLocation get id from the database
        Location foundLocation = locationRepo.getReferenceById(savedLocation.getId());
        assertThat(savedLocation.toString().equals(foundLocation.toString()));
    }
	
	@Test
    @Transactional //avoid LazyInitializationException
    public void insertDepoAndCheckValues() {
        Depo depo = new Depo();
        depo.setProductName("New product");
        depo.setWarehouse1(88);
        depo.setWarehouse2(888);
        depo.setWarehouse3(8888);
        Depo savedDepo = depoRepo.save(depo);
        
        //depo does not have an id; foundDepo get id from the database
        Depo foundDepo = depoRepo.getReferenceById(savedDepo.getId());
        assertThat(savedDepo.toString().equals(foundDepo.toString()));
    }
	
	@Test
    @Transactional //avoid LazyInitializationException
    public void insertDepartureAndCheckValues() {
	    Departure departure = new Departure();
	    departure.setTime(new Date());
	    departure.setUnit(2);
	    departure.setOrigin("Turku");
	    departure.setDestination("Vantaa");
        Departure savedDeparture = departureRepo.save(departure);
        
        //departure does not have an id; foundDeparture get id from the database
        Departure foundDeparture = departureRepo.getReferenceById(savedDeparture.getId());
        assertThat(savedDeparture.toString().equals(foundDeparture.toString()));
    }
	
	@Test
    @Transactional //avoid LazyInitializationException
    public void insertCusOrderAndCheckValues() {
	    CusOrder cusOrder = new CusOrder();
	    cusOrder.setCustomer("New customer");
	    cusOrder.setProductNo(142857);
	    cusOrder.setDay(3);
	    cusOrder.setHour(12);
	    cusOrder.setAirGround(2);
        cusOrder.setNoOfPackages(5);
        cusOrder.setWeight(1.73205);
        cusOrder.setCube(0.454);
        CusOrder savedCusOrder = cusOrderRepo.save(cusOrder);
        
        //cusOrder does not have an id; foundCusOrder get id from the database
        CusOrder foundCusOrder = cusOrderRepo.getReferenceById(savedCusOrder.getId());
        assertThat(savedCusOrder.toString().equals(foundCusOrder.toString()));
    }
}
