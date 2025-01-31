import {View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Platform,} from "react-native";
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

const ComboBox = ({data, onChange, placeholder}: DropDownProps) =>{

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
            topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);
            setTop(finalValue);
        }}
        >
            <TouchableOpacity
                className="justify-between bg-black flex-row items-center w-[100%] p-2 rounded-lg mt-4 mb-4"
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <View className="flex-1 items-center justify-center flex-row gap-4">
                    <Text className=" text-white ">{value || placeholder}</Text>
                    
                </View>
                <AntDesign color={"white"} name={expanded ? "caretup" : "caretdown"} />
                
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View className=" items-center flex-1 p-20 ">
                            <View className="w-full bg-black absolute items-center vh-12" style={[{ top }]}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            className=""
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text className="text-white">{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}
export default ComboBox
