import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { View,Image, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Reusable Picker component
const Picker = ({ label, items, onValueChange, value }) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <RNPickerSelect
      onValueChange={onValueChange}
      value={value}
      items={items}
      placeholder={{ label: '-- Choose --', value: null }}
      style={pickerStyles}
    />
  </>
);

const Homepage = ({ navigation }) => {
  const [course, setCourse] = useState('');
  const [session, setSession] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);
  const [semestersitem,setSemestersItem]=useState([])
  const [courseItem,setCourseItem]=useState([])
  

  const viewResult = () => {
    // Check if all fields are filled
    if (!course || !session || !rollNumber || !semester) {
      Alert.alert('Input Validation', 'Please fill all fields!');
      return;
    }

    async function fetchResult() {
      setLoading(true);
let url=null
      if(session==='201819'){
         url = `http://103.57.178.67/${courese}2019`;
      }else{
         url = `http://103.57.178.67/S${session}/${course}${session}/${semester}.php?Enroll=${rollNumber}`;
      }

      try {
        const response = await axios.get(url);
        const data = response.data;
        const rurl=response.request.responseURL
       if(url===rurl){
        navigation.navigate('ResultView', { data });
       }
       else{
        return alert('invalid Course/Session/Semester/RollNumber')
       }
      } catch (error) {
        console.error('Error fetching result:', error);
        Alert.alert('Failed to fetch result. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchResult();
  };

  // Function to dynamically generate session labels
  const generateSessionOptions = () => {
    const startYear = 2018;
    const currentYear = new Date().getFullYear();
    const sessionOptions = [];
    
    for (let year = startYear; year < currentYear; year++) {
      sessionOptions.push({
        label: `${year}-${year + 1}`,
        value: `${year}` + `${year + 1}`.slice(-2), // Extracts last 6 digits (e.g. 202324)
      });
    }
  
    return sessionOptions;
  };
  const sessionItems = generateSessionOptions();
//Show Course According to Session
     useEffect(()=>{

      if(session==='201819'||session==='201920'|| session==='202021'){
        setCourseItem([
          { label: 'UG & PG RESULTS', value: 'other' },
          { label: 'UG & PG CARRY RESULTS', value: 'otherc' },
          { label: 'DIPLOMA COURSES RESULTS', value: 'diploma' },
          { label: 'DIPLOMA COURSES CARRY RESULTS', value: 'diplomac' },
   
        ])
        return
      }else if(session==='202122'||course==='202223'){
        
        setCourseItem([
          { label: 'UG & PG RESULTS', value: 'other' },
          { label: 'UG & PG CARRY RESULTS', value: 'otherc' },
          { label: 'B.PHARMA CARRY RESULTS(ODD)', value: 'bpodd' },
          { label: 'B.PHARMA CARRY RESULTS(EVEN))', value: 'bpeven' },
          { label: 'B.PHARMA SPECIAL CARRY OVER RESULTS', value: 'bpspc' },
          { label: 'DIPLOMA COURSES RESULTS', value: 'diploma' },
          { label: 'DIPLOMA COURSES CARRY RESULTS', value: 'diplomac' },
   
        ])
        return
      }else if(session==='202324'){
        
        setCourseItem([
          { label: 'UG & PG RESULTS', value: 'other' },
          { label: 'UG & PG CARRY RESULTS(ODD)', value: 'otheroddc' },
          { label: 'UG & PG CARRY RESULTS(EVEN))', value: 'otherevenc' },
          { label: 'UG & PG CARRY RESULTS SPECIAL CARRY OVER RESULTS', value: 'otherspc' },
          { label: 'DIPLOMA COURSES RESULTS', value: 'diploma' },
          { label: 'DIPLOMA COURSES CARRY RESULTS(ODD)', value: 'diplomaoddc' },
          { label: 'DIPLOMA COURSES CARRY RESULTS(EVEN)', value: 'diplomaevenc' },
          { label: 'DIPLOMA COURSES SPECIAL CARRY OVER RESULTS', value: 'diplomaspc' },
   
        ])
        return
      }
      else {
        setCourseItem([])
      }
     },[session])

// Show Semester According To Course
  useEffect(()=>{
if(session==='201819'){
  //****************************2018-2019****************************
  if(course==='other'){
    setSemestersItem([  
      { label: 'UG & PG Semester1', value: '1' },
      { label: 'UG & PG Semester 2', value: '2' },
      { label: 'UG & PG Semester 3', value: '3' },
      { label: 'UG & PG Semester 4', value: '4' },
      { label: 'UG & PG Semester 5', value: '5' },
      { label: 'UG & PG Semester 6', value: '6' },
      { label: 'UG & PG Semester 7', value: '7' },
      { label: 'UG & PG Semester 8', value: '8' },
      { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
      { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
      { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
      { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
    {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
    {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
    {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
    {label:'B.E.D Semester 1' , value:'BED%20I'},
    {label:'B.E.D Semester 2' , value:'BED%20II'},
    {label:'B.S.C-Agriculture Semester 1',value:'BSC-AG%20I'},
    {label:'B.S.C-Agriculture Semester 2',value:'BSC-AG%20II'},
    ])
    return
  }else if(course==='otherc'){
    setSemestersItem([  
      { label: 'UG & PG Semester1', value: '1' },
      { label: 'UG & PG Semester 2', value: '2' },
      { label: 'UG & PG Semester 3', value: '3' },
      { label: 'UG & PG Semester 4', value: '4' },
      { label: 'UG & PG Semester 5', value: '5' },
      { label: 'UG & PG Semester 6', value: '6' },
      { label: 'UG & PG Semester 7', value: '7' },
      { label: 'UG & PG Semester 8', value: '8' },
      { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
      { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
      { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
      { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
      { label: 'B.A.M.S Semester 1 OCT-19', value: 'BAMS%20I-OCT19' },
      { label: 'B.A.M.S Semester 2 OCT-19', value: 'BAMS%20II-OCT19' },
      { label: 'B.A.M.S Semester 3 OCT-19', value: 'BAMS%20III-OCT19' },
      { label: 'B.A.M.S Semester 4 OCT-19', value: 'BAMS%20IV-OCT19' },
    {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
    {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
    {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
    {label:'B.E.D Semester 1' , value:'BED%20I'},
    {label:'B.E.D Semester 2' , value:'BED%20II'},
    {label:'B.S.C-Agriculture Semester 1',value:'BSC-AG%20I'},
    {label:'B.S.C-Agriculture Semester 2',value:'BSC-AG%20II'},
    ])
    return
  }else if(course==='diploma'|| course==='diplomac'){
    setSemestersItem([
      { label: 'Diploma Semester1', value: '1' },
      { label: 'Diploma Semester 2', value: '2' },
      { label: 'Diploma Semester 3', value: '3' },
      { label: 'Diploma Semester 4', value: '4' },
      { label: 'Diploma Semester 5', value: '5' },
      { label: 'Diploma Semester 6', value: '6' },
      { label: 'DPHARMA Semester 1', value: 'DPHARM%20I' },
      { label: 'DPHARMA Semester 2', value: 'DPHARM%20II' },
    ])
  }
  }else if(session==='201920'){
    if(course==='other'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 4-OCT20', value: 'BAMS%20IV-OCT20' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},
      ])
      return
    }else if(course==='otherc'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 1-OCT19', value: 'BAMS%20I-OCT19' },
        { label: 'B.A.M.S Semester 2-OCT19', value: 'BAMS%20II-OCT19' },
        { label: 'B.A.M.S Semester 3-OCT19', value: 'BAMS%20III-OCT19' },
        { label: 'B.A.M.S Semester 4-OCT19', value: 'BAMS%20IV-OCT19' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.S.C-Agriculture Semester 1',value:'BSC-AG%20I'},
      {label:'B.S.C-Agriculture Semester 2',value:'BSC-AG%20II'},
      ])
      return
    }else if(course==='diploma'|| course==='diplomac'){
      setSemestersItem([
        { label: 'Diploma Semester1', value: '1' },
        { label: 'Diploma Semester 2', value: '2' },
        { label: 'Diploma Semester 3', value: '3' },
        { label: 'Diploma Semester 4', value: '4' },
        { label: 'Diploma Semester 5', value: '5' },
        { label: 'Diploma Semester 6', value: '6' },
        { label: 'DPHARMA Semester 1', value: 'DPHARM%20I' },
        { label: 'DPHARMA Semester 2', value: 'DPHARM%20II' },
      ])
    }
    
  } else if(session==='202021' ){
    if(course==='other'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 4-OCT20', value: 'BAMS%20IV-OCT20' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'B.N.Y.S Semester 3' , value:'BNYS-III'},
      {label:'B.N.Y.S Semester 4' , value:'BNYS-IV'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},
      ])
      return
    }else if(course==='otherc'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 1-DEC21', value: 'BAMS%20I-DEC21' },
        { label: 'B.A.M.S Semester 2-DEC21', value: 'BAMS%20II-DEC21' },
        { label: 'B.A.M.S Semester 3-DEC21', value: 'BAMS%20III-DEC21' },
        { label: 'B.A.M.S Semester 4-DEC21', value: 'BAMS%20IV-DEC21' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.S.C-Agriculture Semester 1',value:'BSC-AG%20I'},
      {label:'B.A YOGA',value:'BA%20YOGA'},
      {label:'B.A YOGA',value:'BA%20YOGA'},     
      ])
      return
    }else if(course==='diploma'|| course==='diplomac'){
      setSemestersItem([
        { label: 'Diploma Semester1', value: '1' },
        { label: 'Diploma Semester 2', value: '2' },
        { label: 'Diploma Semester 3', value: '3' },
        { label: 'Diploma Semester 4', value: '4' },
        { label: 'Diploma Semester 5', value: '5' },
        { label: 'Diploma Semester 6', value: '6' },
        { label: 'DPHARMA Semester 1', value: 'DPHARM%20I' },
        { label: 'DPHARMA Semester 2', value: 'DPHARM%20II' },
      ])
    }
  }else if(session==='202122'){
    if(course==='other' || course==='bpodd'|| course==='bpeven'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'UG & PG Semester 9', value: '9' },
        { label: 'UG & PG Semester 10', value: '10' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 4-OCT20', value: 'BAMS%20IV-OCT20' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'B.N.Y.S Semester 3' , value:'BNYS-III'},
      {label:'B.N.Y.S Semester 4' , value:'BNYS-IV'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},   
      ])
      return
    }else if(course==='otherc'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'UG & PG Semester 9', value: '9' },
        { label: 'UG & PG Semester 10', value: '10' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
        { label: 'B.A.M.S Semester 1-OCT22', value: 'BAMS%20IV-OCT22' },
        { label: 'B.A.M.S Semester 2-OCT22', value: 'BAMS%20IV-OCT22' },
        { label: 'B.A.M.S Semester 2-APR23', value: 'BAMS%20IV-APR23' },
        { label: 'B.A.M.S Semester 3-OCT22', value: 'BAMS%20IV-OCT22' },
        { label: 'B.A.M.S Semester 3-JAN23', value: 'BAMS%20IV-JAN23' },
        { label: 'B.A.M.S Semester 4-JAN23', value: 'BAMS%20IV-JAN23' },
        { label: 'B.A.M.S Semester 4-APR23', value: 'BAMS%20IV-APR23' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'B.N.Y.S Semester 3' , value:'BNYS-III'},
      {label:'B.N.Y.S Semester 4' , value:'BNYS-IV'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},   
      ])
      return
    }else if(course==='bpspc'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },])
        return
    }else if(course==='diploma'|| course==='diplomac'){
      setSemestersItem([
        { label: 'Diploma Semester1', value: '1' },
        { label: 'Diploma Semester 2', value: '2' },
        { label: 'Diploma Semester 3', value: '3' },
        { label: 'Diploma Semester 4', value: '4' },
        { label: 'Diploma Semester 5', value: '5' },
        { label: 'Diploma Semester 6', value: '6' },
        { label: 'DPHARMA Semester 1', value: 'DPHARM%20I' },
        { label: 'DPHARMA Semester 2', value: 'DPHARM%20II' },
      ])
    }

  }else if(session==='202223' || session==='202324'){
    if(course==='other' ){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'UG & PG Semester 9', value: '9' },
        { label: 'UG & PG Semester 10', value: '10' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },
      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'B.N.Y.S Semester 3' , value:'BNYS-III'},
      {label:'B.N.Y.S Semester 4' , value:'BNYS-IV'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},   
      {label:'PG AYURVEDA',value:'PG%AYURVEDA'},   
      ])
      return
    }else if(course==='otherc'|| course==='otheroddc'||course==='otherevenc'){
      setSemestersItem([  
        { label: 'UG & PG Semester1', value: '1' },
        { label: 'UG & PG Semester 2', value: '2' },
        { label: 'UG & PG Semester 3', value: '3' },
        { label: 'UG & PG Semester 4', value: '4' },
        { label: 'UG & PG Semester 5', value: '5' },
        { label: 'UG & PG Semester 6', value: '6' },
        { label: 'UG & PG Semester 7', value: '7' },
        { label: 'UG & PG Semester 8', value: '8' },
        { label: 'UG & PG Semester 9', value: '9' },
        { label: 'UG & PG Semester 10', value: '10' },
        { label: 'B.A.M.S Semester 1', value: 'BAMS%20I' },
        { label: 'B.A.M.S Semester 2', value: 'BAMS%20II' },
        { label: 'B.A.M.S Semester 3', value: 'BAMS%20III' },
        { label: 'B.A.M.S Semester 4', value: 'BAMS%20IV' },

        { label: 'B.A.M.S Semester 1-OCT22', value: 'BAMS%20I-OCT22' },
        { label: 'B.A.M.S Semester 2-OCT22', value: 'BAMS%20II-OCT22' },
        { label: 'B.A.M.S Semester 2-APR23', value: 'BAMS%20II-APR23' },
        { label: 'B.A.M.S Semester 3-DEC23', value: 'BAMS%20III-DEC23' },
        { label: 'B.A.M.S Semester 4-DEC23', value: 'BAMS%20IV-DEC23' },

      {label:'B.N.Y.S Semester 1' , value:'BNYS-I'},
      {label:'B.N.Y.S Semester 2' , value:'BNYS-II'},
      {label:'B.N.Y.S Semester 3' , value:'BNYS-III'},
      {label:'B.N.Y.S Semester 4' , value:'BNYS-IV'},
      {label:'P.G.D-YOGA' , value:'PGD-YOGA%20I'},
      {label:'B.E.D Semester 1' , value:'BED%20I'},
      {label:'B.E.D Semester 2' , value:'BED%20II'},
      {label:'B.A YOGA',value:'BA%20YOGA'},   
      ])
      return
    }else if(course==='bpodd' || course==='bpeven' || course==='bpspc'){
      setSemestersItem([
        { label: 'Semester 1', value: '1' },
        { label: 'Semester 2', value: '2' },
        { label: 'Semester 3', value: '3' },
        { label: 'Semester 4', value: '4' },
        { label: 'Semester 5', value: '5' },
        { label: 'Semester 6', value: '6' },
        { label: 'Semester 7', value: '7' },
        { label: 'Semester 8', value: '8' },
        
      ])
      return
    }else if(course==='diploma'|| course==='diplomac'){
      setSemestersItem([
        { label: 'Diploma Semester1', value: '1' },
        { label: 'Diploma Semester 2', value: '2' },
        { label: 'Diploma Semester 3', value: '3' },
        { label: 'Diploma Semester 4', value: '4' },
        { label: 'Diploma Semester 5', value: '5' },
        { label: 'Diploma Semester 6', value: '6' },
        { label: 'DPHARMA Semester 1', value: 'DPHARM%20I' },
        { label: 'DPHARMA Semester 2', value: 'DPHARM%20II' },
      ])
    }
  }

  },[course])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri:'https://dli6r6oycdqaz.cloudfront.net/college-36/user-109260/30c39e6db4a149f89b6fd7f01e0cdde9_20210608_132206_36_109260_SUG_logo.png'}}
      style={styles.image} />
      <Text style={styles.header}>Shobhit University Gangoh</Text>
      <Text style={styles.subHeader}>Results</Text>

        
         <Picker 
        label="Select Session" 
        items={sessionItems}
        onValueChange={setSession} 
        value={session} 
      />

      <Picker 
        label="Select Your Course" 
        items={courseItem}
        onValueChange={setCourse} 
        value={course} 
      />

    

<Picker 
        label="Select Semester" 
        items={semestersitem}
        onValueChange={setSemester} 
        value={semester} 
      />

      <Text style={styles.label}>Enter Your Roll Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number"
        keyboardType="numeric"
        value={rollNumber}
        onChangeText={setRollNumber}
      />

      <TouchableOpacity onPress={viewResult} style={styles.button}>
        <Text style={styles.buttonText}>View Result</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5e46b4" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',  // Ensures content is centered
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5e46b4',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#5e46b4',
    textAlign: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%', 

  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  textAlign:'center'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', // Makes the image responsive
  },
});

const pickerStyles = {
  inputAndroid: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  inputIOS: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
};

export default Homepage;
