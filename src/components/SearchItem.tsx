import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Todo } from '../types/todo';
import { LinearGradient } from 'expo-linear-gradient';


interface SearchItemProps {
    filteredTodos: Todo[];
}


const SearchItem: FC<SearchItemProps> = ({
    filteredTodos
}) => {

    return (
        <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.taskId}
            horizontal={true}
            style={{ width: "100%", flex: 1, gap: 16 }}
            renderItem={({ item }) => (
                <TouchableOpacity key={item.taskId || item.title} style={styles.todoCard}>
                    <LinearGradient
                        colors={["#fca5a5", "#f87171"]}
                        style={styles.todo}
                        start={{ x: 2, y: 2 }}
                        end={{ x: 0, y: 0 }}
                    >
                        <View style={styles.todoTitle}>
                            <Text style={{ fontFamily: "DMBold", color: "#fff", fontSize: 16, flex: 1 }}>
                                {item.title}
                            </Text>
                            <Text style={styles.description}>
                                {item.description.length >= 20 ? item.description.slice(0, 15) : item.description}
                            </Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        />
    )
}

export default SearchItem

const styles = StyleSheet.create({

    todoHeading: {
        fontSize: 16,
        fontFamily: "DMBold",
        color: "#1f2937",
    },
    todoCard: {
        width: "100%",
        height: "auto",
        borderRadius: 15,
        backgroundColor: "#fff",
        marginRight: 16,
        flex: 1,
        minWidth: 180
    },
    todo: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 15,
        backgroundColor: "rgba(248, 113, 113, 0.8)",
        width: "100%",
        position: "relative",
    },
    todoTitle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 15,
        width: "100%",
        fontFamily: "DMRegular",
        fontSize: 16,
        color: "#fff",
    },
    todoDate: {
        fontSize: 12,
        color: "#f9fafb",
        fontFamily: "DMRegular",
        position: "absolute",
        bottom: 2,
        right: 2,
    },
    description: {
        fontSize: 14,
        color: "#f9fafb",
        fontFamily: "DMRegular",
        marginTop: 2
    }
});