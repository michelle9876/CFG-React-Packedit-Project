import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase-config";
import { collection, getDocs, doc, deleteDoc, onSnapshot, QuerySnapshot, writeBatch ,query} from "firebase/firestore";
import NavBar from "../../components/NavBar";
import ListBody from "../../components/ListBody";
import DisplayCategories from "../../components/DisplayCategories";
import "../../styles/YourList.scss";
import { propTypes } from "react-bootstrap/esm/Image";
import AddCategory from "../../components/AddCategory";
import CategoriesOption from "../../components/CategoriesOption";
import Button from "react-bootstrap/Button";


function YourList() {
  // Setting states
  // setList function used to alter the list

  //every trip i have
  const [myList, setMyList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

// theTrip is the chosen trip in the child's drop down button
  const [theTrip, setTheTrip] = useState("");

  const updateTheTrip = (theChosenTrip) => {
      setTheTrip(theChosenTrip);
  };

  const deleteDocument = async(TripID, CategoryID) => {
    // console.log("Trip: ", TripID, "Category", CategoryID);

    // (db, Colletions, Document)
    await deleteDoc(doc(db, "trips/"+TripID+"/categories", CategoryID));
  };

  const deleteDocumentTrip = async(TripID) => {
    // console.log("Trip: ", TripID, "Category", CategoryID);
    await deleteDoc(doc(db, "trips", TripID));
  };

  const DeleteTrip = async(id) =>{
    const querySnapshot = await getDocs(collection(db, "trips/"+ id + "/categories"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
          // await deleteDoc(doc(db, "trips/"+props.theTrip+"/categories", id));
      // console.log("id: ", id, "docID" ,doc.id)
      deleteDocument(id, doc.id);
  })

    deleteDocumentTrip(id);
    setTheTrip("");
  };


  useEffect(() => {
    // const getMyListOld = async () => {
    //   const data = await getDocs(myListCollectionRef);
    //   setMyList(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); // at the moment this displays all documents in the collection, we want only one
    //   //after receiving data, set isLoading to false
    //   setIsLoading(false);
    // };

  // get all my list of trips and display on category options
    const getMyList = async () => {
      const q = query(collection(db, "trips"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const theTrips = [];
        querySnapshot.forEach((doc) =>{
          theTrips.push({...doc.data(), id:doc.id});
        });

        setMyList(theTrips);
        setIsLoading(false);
      });
  };

    getMyList();
  }, []);

  //Ternary operator to display data appropriately
  //If isLoading === true, page is still loading
  //If isLoading === false, display data
  return isLoading ? (
    <div>
      <h2>Data Loading...</h2>
    </div>
  ) : (
    <div className="home-bg">
      <div className="container-fluid" style={{ paddingBottom: "7%" }}>
        <div className="row">
          <div className="col">
            <nav>
              <NavBar />
            </nav>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "170px", paddingLeft: "2%" }}>
          <div className="col-3 mx-5 your-list-card">
            <h3>Categories</h3>
            <DisplayCategories theTrip={theTrip}/>
            {theTrip === "" ? <></> : <AddCategory theTrip={theTrip}/>}
            
            {/* {myList.map((list, i) => {
                return <div key={i}>
                  {list.ListCategories.map((category, i) => {
                    return <div key={i}>
                      {category.CategoryName}
                      </div>
                  })}
                </div>
              })} */}

          </div>
          <div className="col ml-5" style={{ paddingRight: "7%" }}>
            <div className="row your-list-info-card">
              {/* <div>chosen: {theTrip}</div> */}
            {/* Pass the function to Child */}
              <CategoriesOption trips={myList} updateTheTrip={updateTheTrip}/>
              
              {/* {myList.map((list, i) => {
                return <div key={i}>
                  <p>List Name: {list.ListName}</p>
                  <p>Destination: {list.Destination}</p>
                  <p>Date: {list.Date.toDate().toDateString()}</p>
                  <p>{list.id}</p>
                </div>
              })} */}
              {theTrip !== "" ? myList.filter(theList => theList.id.includes(theTrip)).map((trip) => (
                <>
              <h3>List Info</h3>
              <div>
                <p>List Name: {trip.ListName}</p>
                <p>Destination: {trip.Destination}</p>
                <p>Date: {trip.Date.toDate().toDateString()}</p>
                {/* <p>trip id is {trip.id}</p> */}
                <Button onClick={()=>DeleteTrip(trip.id)}>Cancel</Button>
              </div>
              
             
              </>)) : <></>}
            </div>
            <div className="row mt-3">
              <h3>List Body</h3>
              <ListBody theTrip={theTrip}/>
              {/* {myList.map((list, i) => {
                return <div key={i}>
                  {list.ListCategories.map((category, i) => {
                    return <div key={i}>
                      {category.CategoryItems.map((item, i) => {
                        return <div key={i}>
                          {item}
                          </div>
                      })}
                      </div>
                  })}
                </div>
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourList;
