import React, { useEffect } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const styles = StyleSheet.create({
  hr: {
    borderColor: 'lightgray',
    borderWidth: 1,
    width: '80%',
    marginLeft: '10%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    padding: 5,
    margin: 10,
    backgroundColor: 'white'
  },
  circleContainer: {
    flexDirection: 'row',
  },
  openCircle: {
    marginRight: 15,
    height: 15,
    width: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'blue'
  },
  filledCircle: {
    marginRight: 15,
    height: 15,
    width: 15,
    borderRadius: 100,
    backgroundColor: 'blue'
  },
  medicationRow: {
    borderWidth: 1,
    borderColor: 'lightgray',
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  barContainer: {
    height: 10,
    width: '100%',
    backgroundColor: 'navajowhite'
  },
  buddy: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10
  },
  historyDay: {

  },
  header: {
    fontSize: 20,
    fontWeight: 400
  },
  medicationTime:{
    color: "#959DA5",
    fonSize: 12,
    lineHeight: 15

  },
  pill:{
    fontSize: 16,
    lineHeight: 20,
    color: "#303030",
    fontWeight: 'bold'
  },
  amount:{
    fontSize: 16,
    lineHeight: 20,
    color: "#303030"
  },
  medCardButton: {
    // flex: ;
flexDirection: "row",
justifyContent: "flex-end",
alignItems: "flex-start",
padding: 0,
position: "static",
width: 100,
height: 40,
left: 227,
top: 25,
background: "#5C7CFA",
bordeRadius: 4





  },
  med: {
    position: "static",
    width: 40,
    height: 40,
    left: 56,
    top: 25,
    transform: [{ matrix:[-1, 0, 0, 1, 0, 0] }]
  },
  medInfo: {
    // display: flex;
flexDirection: "column",
alignItems: "flex-start",
padding: 0,
position: "static",
width: 139,
height: 58,
left: 72,
top: 16
  },

  // buttonCircular: {
  //   position: "absolute",
  //   left: "92.5%",
  //   right: "-77.5%",
  //   top: "7.5%",
  //   bottom: "7.5%",
  //   shadowColor:  "rgba(171, 184, 198, 0.35)",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowRadius: 8
  // }



});

function TakeMeds () {
  return (
    <View style={styles.section}>
      <Text style = {styles.header}>Take your meds</Text>
      <Button title="Full schedule" />
      <Text>Morning Medication</Text>
      <Text>6 routine meds</Text>
      <View style={styles.circleContainer}>
        <View style={styles.filledCircle}></View>
        <View style={styles.filledCircle}></View>
        <View style={styles.filledCircle}></View>
        <View style={styles.openCircle}></View>
        <View style={styles.openCircle}></View>
        <View style={styles.openCircle}></View>
      </View>
      <View style={styles.medicationRow}>
        <Button style={styles.med}></Button>
          <View style={styles.medInfo}>
          <Text style={styles.medicationTime}>6:00 AM</Text>
          <Text style={styles.pill}>Vitamin C</Text>
          <Text style={styles.amount}>Take 1 tablet</Text>
        </View>
        <Button style={styles.medCardButton}title="Take ✓" />
      </View>
      <View style={styles.medication}>
        <Text>6:00 AM</Text>
        <Text>Magnesium</Text>
        <Text>Take 1 tablet</Text>
        <Button title="Take" />
      </View>
      <View style={styles.medication}>
        <Text>6:00 AM</Text>
        <Text>Prednisolone</Text>
        <Text>Take 1 pill</Text>
        <Button title="Take" />
      </View>
    </View>
  )
}

function AsNeeded () {
  return (
    <View style={styles.section}>
      <Text>As-needed medication</Text>
      <Text>3 of 5 meds okay to take</Text>
      <Button title="View" />
    </View>
  )
}

function Rewards () {
  return (
    <View style={styles.section}>
      <Text>Earn Rewards</Text>
      <Button title="All Rewards" />
      <Text>80 Points</Text>
      <View style={styles.barContainer}>
        <View style={{ backgroundColor: 'orange', position: 'absolute', width: '20%', height: '100%' }} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.filledCircle} />
        <Text>5 Stars earned</Text>
        <Text>Open the app once a day</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.filledCircle} />
        <Text>15 Stars earned</Text>
        <Text>3 meds taken</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.openCircle} />
        <Text>0 Stars earned</Text>
        <Text>Daily health survey</Text>
      </View>
      <Text>Expand</Text>
    </View>
  )
}

function buddyItem ({item: buddy}) {
  return (
    <View key={buddy.id} style={styles.buddy}>
      <Image source={{uri: buddy.avatarUrl}} style={{ height: 40, width: 40 }} />
      <Text>{buddy.name}</Text>
      <Text>All-time adherence</Text>
      <Text>{String(buddy.adherence).slice(0, 2)}%</Text>
    </View>
  )
}

function Buddies () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: 'FETCH_BUDDIES' })
  }, [])
  const buddyList = useSelector(state => state.buddies)

  return (
    <View style={styles.section}>
      <Text>Check on buddies</Text>
      <Button title="All buddies" />
      <FlatList
        data={buddyList.slice(0,3)}
        renderItem={buddyItem}
        keyExtractor={buddy => String(buddy.id)}
      />
    </View>
  )
}

function RecentHistory () {
  return (
    <View style={styles.section}>
      <Text>Past 7 days</Text>
      <Button title="Medication history" />
      <Text>Medication Progress</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.historyDay}>
          <Text>Th</Text>
          <Text>12</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Fri</Text>
          <Text>13</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '100%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Sat</Text>
          <Text>14</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '100%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Sun</Text>
          <Text>15</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Mon</Text>
          <Text>16</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Tues</Text>
          <Text>17</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
        <View style={styles.historyDay}>
          <Text>Wed</Text>
          <Text>18</Text>
          <View style={styles.barContainer}>
            <View style={{ backgroundColor: 'orange', width: '50%', height: '100%' }} />
          </View>
        </View>
      </View>
    </View>
  )
}

function DashboardScreen () {
  return (
    <ScrollView>
      <TakeMeds />
      <View style={styles.hr} />
      <AsNeeded />
      <View style={styles.hr} />
      <Rewards />
      <View style={styles.hr} />
      <Buddies />
      <View style={styles.hr} />
      <RecentHistory />
    </ScrollView>
  );
}

export default DashboardScreen