import { React, useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Center, TouchableHighlight, HStack, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Button, Avatar } from "native-base";
import ActionCard from '../ActionsPage/ActionCard';



export default function ProfilePageAlternate({ navigation }) {
    

    const [displayToDo, setdisplayToDo] = useState(true);
    const ListText = props => {
        if (displayToDo) {
            return <View>
                    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Actions</Text>
                    <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>To-Do</Text>
                </View>;
        }
        else {
            return <View>
                    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Actions</Text>
                    <Text style={[styles.text, { fontSize: 20, color: "#DFD8C8", fontWeight: "300" }]}>Completed</Text>
                </View>;
        }
    }

    const switchList = () => {
        console.log("testing")
        setdisplayToDo(current => !current);
        console.log(displayToDo)
    }
        
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Button style={styles.button} onPress={()=>{navigation.navigate("userProfile")}}>
                        <View>
                            <Ionicons name="settings-outline" size={24} color="#52575D"></Ionicons>
                        </View>
                    </Button>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: "https://images.unsplash.com/photo-1642572285001-20d5d570c7d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"}} style={styles.image} resizeMode="center"></Image>
                    </View>
                    {/*<View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                    */}
                </View>
                
            
                

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Your Name</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Community Name</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>12</Text>
                        <Text style={[styles.text, styles.subText]}>CO2 Saved</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>987</Text>
                        <Text style={[styles.text, styles.subText]}>Trees</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45</Text>
                        <Text style={[styles.text, styles.subText]}>Points</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    
                    
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: "https://m.media-amazon.com/images/I/61JhlT09xiL._AC_SX679_.jpg"}} style={styles.image} resizeMode="cover"></Image>
                        </View>

                    </ScrollView>
                    <Pressable style={{
                        position: "absolute", 
                        top: "50%", 
                        marginTop: -50, 
                        marginLeft: 30, 
                        width: 100, 
                        height: 100, 
                        alignItems: "center", 
                        justifyContent: "center", 
                        borderRadius: 12, 
                        shadowColor: "rgba(0, 0, 0, 0.38)", 
                        shadowOffset: { width: 0, height: 10 },
                        shadowRadius: 20,
                        shadowOpacity: 1, 
                        backgroundColor : displayToDo ? "#41444B" : "#64B058"}} 
                        onPress={() => {console.log("Switch view"), switchList()}}>
                        <ListText style={{color: 'blue'}}/>

                    </Pressable>
                </View>


                <Text style={[styles.subText, styles.recent]}>Badges</Text>
                
    
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} justifyContent="center">
                    <Avatar.Group paddingRight={35}_avatar={{
                        size: "lg",
                        }} max={4}>
                            <Avatar bg="green.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            1
                            </Avatar>
                            <Avatar bg="cyan.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            2
                            </Avatar>
                            <Avatar bg="indigo.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            3
                            </Avatar>
                            <Avatar bg="amber.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            4
                            </Avatar>
                            <Avatar bg="green.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            5
                            </Avatar>
                            <Avatar bg="cyan.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            6
                            </Avatar>
                            <Avatar bg="indigo.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            7
                            </Avatar>
                            <Avatar bg="amber.500" source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/7963/7963920.png"
                        }}>
                            8
                            </Avatar>
                    </Avatar.Group>
                </ScrollView>


                <Text style={[styles.subText, styles.recent]}>Teams</Text>
                <View style={{flexDirection: 'row', paddingLeft: 78, paddingTop: 20, justifyContent: 'space-between'}}>
                    <View flexDirection="row">
                        <Ionicons name="people-outline" size={20} color="#52575D"></Ionicons>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300", fontSize: 20, paddingLeft: 8}]}>
                            Team 1
                        </Text>
                    </View>
                    <View flexDirection="row">
                        <Ionicons name="add-circle-outline" size={20} color="#52575D" paddingRight={10}></Ionicons>
                        <Ionicons name="remove-circle-outline" size={20} color="#52575D" paddingRight={60}></Ionicons>
                    </View>
                </View>

                <Text style={[styles.subText, styles.recent]}>Household</Text>
                <View style={{flexDirection: 'row', paddingLeft: 78, paddingTop: 20, justifyContent: 'space-between'}}>
                    <View flexDirection="row">
                        <Ionicons name="home-outline" size={20} color="#52575D"></Ionicons>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300", fontSize: 20, paddingLeft: 8}]}>
                            Home
                        </Text>
                    </View>
                    <View flexDirection="row">
                        <Ionicons name="add-circle-outline" size={20} color="#52575D" paddingRight={10}></Ionicons>
                        <Ionicons name="remove-circle-outline" size={20} color="#52575D" paddingRight={60}></Ionicons>
                    </View>
                </View>
                

                <Text style={[styles.subText, styles.recent]}>Community</Text>
                <View flexDirection="row">
                    <Image
                        source={require("../../../assets/images/cooler-concord.png")}
                        alt="Community Logo"
                        resizeMode="contain"
                        height={null}
                        width={null}
                        marginLeft={60}
                        marginTop={20}
                    />
                    <View paddingTop={15}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "400", fontSize: 20, paddingLeft: 8}]}>
                            Cooler Concord
                        </Text>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300", fontSize: 12, paddingLeft: 8}]}>
                            Concord, Massachusetts
                        </Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center", paddingTop: 20 }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Left a testimonial for <Text style={{ fontWeight: "400" }}>Service Provider A</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Completed <Text style={{ fontWeight: "400" }}>Change to LED</Text> and <Text style={{ fontWeight: "400" }}>Eat Plant-Based</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Joined <Text style={{ fontWeight: "400" }}>CoolerConcord</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: Platform.OS === 'ios' ? "HelveticaNeue" : "sans-serif-thin",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    actionContainer: {
        width: 300,
        height: 300,
        overflow: "hidden",
        marginHorizontal: 10,
    },
    mediaCount: {
        
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 14
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});