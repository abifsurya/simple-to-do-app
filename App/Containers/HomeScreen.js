import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import NavHeader from '../Components/NavHeader';
import EmptyView from '../Components/View/EmptyView';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

// Redux
import ToDoActions, {ToDoSelectors} from '../Redux/ToDoRedux';

export class HomeScreen extends Component {
  showActionSheet = (item) => {
    this.setState({item});
    this.ActionSheet.show();
  };

  renderItem = ({item}) => {
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        onPress={() =>
          this.props.navigation.navigate('AddEditScreen', {
            headerTitle: 'Detail',
            title: item.title,
            desc: item.desc,
            category: item.category,
            viewMode: true,
          })
        }
        onLongPress={() => this.showActionSheet(item)}
        style={{
          height: 60,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.completed ? (
              <Icon size={15} color="green" name="check" />
            ) : null}
            <View style={{margin: 5}} />
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={{fontSize: 14, fontStyle: 'italic'}}>
                {item.category}
              </Text>
              <Text style={{fontSize: 14}}>{`${item.time}, ${item.date}`}</Text>
            </View>
          </View>

          <Icon size={15} color="gray" name="chevron-right" />
        </View>
      </Touchable>
    );
  };

  _keyExtractor = (item, index) => index;

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavHeader
          title="To-Do List"
          iconName="plus"
          onIconPress={() =>
            this.props.navigation.navigate('AddEditScreen', {
              headerTitle: 'Add',
            })
          }
        />
        {this.props.todoList.length === 0 ? (
          <EmptyView />
        ) : (
          <FlatList
            data={this.props.todoList}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderItem}
          />
        )}
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Operation'}
          options={['Complete', 'Edit', 'Delete', 'cancel']}
          cancelButtonIndex={3}
          onPress={(index) => {
            if (index === 0) {
              this.props.doCompleteTodo(this.state.item.id);
            } else if (index === 1) {
              this.props.navigation.navigate('AddEditScreen', {
                headerTitle: 'Edit',
                title: this.state.item.title,
                desc: this.state.item.desc,
                category: this.state.item.category,
                id: this.state.item.id,
                viewMode: false,
              });
            } else if (index === 2) {
              this.props.doDeleteTodo(this.state.item.id);
            }
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  todoList: ToDoSelectors.selectTodoList(state),
});

const mapDispatchToProps = (dispatch) => ({
  doDeleteTodo: (e) => dispatch(ToDoActions.deleteTodoRequest(e)),
  doCompleteTodo: (e) => dispatch(ToDoActions.completeTodoRequest(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
