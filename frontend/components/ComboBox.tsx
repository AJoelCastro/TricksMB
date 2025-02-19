import {View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Platform, Pressable,} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import "../global.css"

type OptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: OptionItem) => void;
    placeholder: string;
}

const ComboBox = ({data, onChange, placeholder, ...props}: DropDownProps) =>{
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);
    const [value, setValue] = useState("");
    const buttonRef = useRef<View>(null);
    const [top, setTop] = useState(0);
    const onSelect = useCallback((item: OptionItem) => {onChange(item); setValue(item.label); setExpanded(false)}, []);
    return (
        <View
        ref={buttonRef}
        onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            const topOffset = layout.y;
            const heightOfComponent = layout.height;
            const finalValue =
            topOffset + heightOfComponent + (Platform.OS === "android" ? + 32 : 3);
            setTop(finalValue);
        }}
        >
            <TouchableOpacity
                className="h-10 mx-auto bg-slate-800 flex-row w-full items-center px-4 my-2 rounded-lg "
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <View className="flex-1 items-center justify-center flex-row gap-4">
                    <Text className=" text-white ">{value || placeholder}</Text>
                </View>
                <AntDesign color={"white"} name={expanded ? "caretup" : "caretdown"} />
                
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent={true} animationType="fade">
                    <Pressable onPress={() => setExpanded(false)}>
                        <View className="flex-1 justify-center items-center p-5 ">
                            <View 
                                className="absolute bg-slate-700 w-full p-2 rounded-lg max-h-60 " 
                                style={[{ top }]}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            className="h-10 items-center justify-center"
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text className="text-white">{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View className="h-1 "></View>
                                    )}
                                />
                            </View>
                        </View>
                    </Pressable>
                </Modal>
            ) : null}
        </View>
    );
}
export default ComboBox
