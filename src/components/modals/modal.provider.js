import React from "react";
import { StyleSheet, View } from 'react-native';
import { Card, Text, Modal, Button, Icon } from '@ui-kitten/components';

export const ModalType = {
    CONFIRM: 'confirm',
    SAVE: 'save'
};

export const ModalContext = React.createContext();

const Header = (props, title) => (
    <View {...props} style={[props.style, styles.headerContainer]}>
        <Text category='h6'>{title}</Text>
    </View>
);

const FooterContainer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
        {props.children}
    </View>
);

const OkIcon = (props) => (
    <Icon {...props} name='checkmark-outline'/>
);

const CancelIcon = (props) => (
    <Icon {...props} name='close-outline'/>
);

export const ConfirmModalButton = (props) => (
    <Button {...props}>{props.children}</Button>
);

export const ModalContextProvider = ({children}) =>  {
    const [modal, setModal] = React.useState(null);

    const showModal = React.useCallback((options) => {
        setModal({
            ...options   
        })
    }, [modal]);

    const handleClick = React.useCallback((target, payload) => {
        target(...payload);
        setModal(null);
    }, []);

    const ModalFactory = (options) => {
       
        const Footer = React.useCallback((footerProps) => (
            <FooterContainer {...footerProps}>
                {options.type == ModalType.CONFIRM &&
                    <>
                        <ConfirmModalButton accessoryLeft={OkIcon} style={styles.buttton} onPress={() => options.onClick(true)}>OK</ConfirmModalButton>
                        <ConfirmModalButton accessoryLeft={CancelIcon} style={styles.buttton} status='basic' onPress={() => options.onClick(false)}>CANCEL</ConfirmModalButton>
                    </>
                }
                {options.type == ModalType.SAVE &&
                    <>
                        <ConfirmModalButton accessoryLeft={OkIcon} style={styles.buttton} status='success' onPress={() => options.onClick(true)}>SAVE</ConfirmModalButton>
                        <ConfirmModalButton accessoryLeft={CancelIcon} style={styles.buttton} status='basic' onPress={() => options.onClick(false)}>CANCEL</ConfirmModalButton>
                    </>
                }
            </FooterContainer>
        ), [options]);

        return (
            <Modal
                style={styles.modal}
                visible={true}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => options.onClick(false)}>
                <Card disabled={true} appearance='filled' status={options.status} header={(headerProps) => Header(options, options.title)} footer={Footer}>
                    {options.children}
                </Card>
            </Modal>
        );
    };

    return React.useMemo(() => (
        <ModalContext.Provider value={{showModal}}>
            {modal && <ModalFactory {...modal} />}
            {children}
        </ModalContext.Provider>
    ), [modal]);
}

const styles = StyleSheet.create({
    modal: {
        paddingHorizontal: 30
    }, 
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttton: {
        marginHorizontal: 10
    }
});