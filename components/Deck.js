import React, { Component } from 'react'
import { View, 
   Text, 
   FlatList, 
   StyleSheet, 
   TouchableOpacity, 
   Button,
   Animated } from 'react-native'
import { connect } from 'react-redux'

function SubmitBtn ({ onPress }) {
    return (
        <Button
            color= 'green'
            title='Add New Quiz'
            onPress={() => onPress()}>
            Add New Quiz
        </Button>
    )
}
function StartQuizBtn ({ onPress }) {
    return (
        <Button
            color= 'green'
            title='Start Quiz'
            onPress={() => onPress()}>
            Start Quiz
        </Button>
    )
}


class Deck extends Component {
    state={
        opacity: new Animated.Value(0)
    }
    componentDidMount(){
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 1000})
        .start()
    }
    render() {
        const {title, questions} = this.props.navigation.state.params.deck
        const { opacity } = this.state
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.item, {opacity}]}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.numberOfCards}>{questions.length} Cards</Text>
                    <View style={styles.buttonContainer}>
                        <SubmitBtn onPress={() => this.props.navigation.navigate(
                                    'NewQuiz',
                                    {title: title}
                        )}/>
                        <StartQuizBtn onPress={() => this.props.navigation.navigate(
                                    'Quiz',
                                    {questions: questions, title:title}
                        )}/>
                    </View>
                </Animated.View>
            </View>

            );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    item:{
        flex: 1,
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    deckTitle:{
        fontSize: 30,
        textAlign: 'center'
    },
    numberOfCards:{
        fontSize: 20,
        textAlign: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20
    }
})
export default connect()(Deck);
