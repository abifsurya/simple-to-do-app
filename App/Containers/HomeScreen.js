import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Modal,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import NavHeader from '../Components/NavHeader';
import EmptyView from '../Components/View/EmptyView';
import RadioButton from '../Components/Button/RadioButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNToasty} from 'react-native-toasty';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';

// Redux
import ToDoActions, {ToDoSelectors} from '../Redux/ToDoRedux';

// Style
import styles from './Styles/HomeScreenStyles';

const sortOptions = [
  {
    label: 'Default',
    value: 0,
  },
  {
    label: 'Name A-Z',
    value: 1,
  },
  {
    label: 'Name Z-A',
    value: 2,
  },
  {
    label: 'Newest',
    value: 3,
  },
  {
    label: 'Oldest',
    value: 4,
  },
];

const Touchable =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModalSort: false,
      showModalFilter: false,
      selected: 0,
      category: '',
    };

    this.renderItem = this.renderItem.bind(this);
    this.renderModalSort = this.renderModalSort.bind(this);
    this.renderModalFilter = this.renderModalFilter.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
  }

  componentDidUpdate() {
    if (this.props.apiStatus.type) {
      if (this.props.apiStatus.type === 'deleteList') {
        RNToasty.Success({title: 'To Do Deleted'});
      }
      this.props.doClearApiStatus();
    }
  }

  showActionSheet(item) {
    this.setState({item});
    this.ActionSheet.show();
  }

  renderItem({item}) {
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
  }

  _keyExtractor = (item, index) => index;

  renderModalSort() {
    return (
      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        visible={this.state.showModalSort}
        onRequestClose={() => this.setState({showModalSort: false})}>
        <View style={styles.modalContainer}>
          <NavHeader title="Sort" />
          <View style={styles.modalBody}>
            <RadioButton
              options={sortOptions}
              onPress={(value) => {
                this.setState({
                  selected: value,
                });
              }}
              selected={this.state.selected}
            />
            <View style={{marginBottom: 15}} />
            <Touchable
              onPress={() => {
                this.setState({showModalSort: false});
                this.props.doSortList(this.state.selected);
              }}>
              <View style={styles.applyButton}>
                <Text style={styles.applyTextButton}>Apply</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </Modal>
    );
  }

  renderModalFilter() {
    const pickerItem = [
      {label: 'Default', value: ''},
      ...this.props.categoryList,
    ];

    return (
      <Modal
        animationType="slide"
        hardwareAccelerated={true}
        visible={this.state.showModalFilter}
        onRequestClose={() => this.setState({showModalFilter: false})}>
        <View style={styles.modalContainer}>
          <NavHeader title="Filter" />
          <View style={styles.modalBody}>
            <Picker
              selectedValue={this.state.category}
              style={{height: 50, width: '100%'}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({category: itemValue})
              }>
              {pickerItem.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
            <View style={{marginBottom: 15}} />
            <Touchable
              onPress={() => {
                this.setState({showModalFilter: false});
                this.props.doFilterList(this.state.category);
              }}>
              <View style={styles.applyButton}>
                <Text style={styles.applyTextButton}>Apply</Text>
              </View>
            </Touchable>
          </View>
        </View>
      </Modal>
    );
  }

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
        {this.props.savedList.length === 0 ? (
          <EmptyView />
        ) : (
          <>
            <View style={styles.buttonContainer}>
              <Touchable onPress={() => this.setState({showModalSort: true})}>
                <View style={styles.buttonView}>
                  <Icon name="sort" size={15} style={{marginRight: 5}} />
                  <Text>Sort</Text>
                </View>
              </Touchable>
              <View style={{borderWidth: 1, height: '100%'}} />
              <Touchable onPress={() => this.setState({showModalFilter: true})}>
                <View style={styles.buttonView}>
                  <Icon name="filter" size={15} style={{marginRight: 5}} />
                  <Text>Filter</Text>
                </View>
              </Touchable>
            </View>
            <FlatList
              data={this.props.todoList}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderItem}
            />
            {this.renderModalSort()}
            {this.renderModalFilter()}
          </>
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
  apiStatus: ToDoSelectors.selectApiStatus(state),
  savedList: ToDoSelectors.selectSavedList(state),
  categoryList: ToDoSelectors.selectCategoryList(state),
});

const mapDispatchToProps = (dispatch) => ({
  doDeleteTodo: (e) => dispatch(ToDoActions.deleteTodoRequest(e)),
  doCompleteTodo: (e) => dispatch(ToDoActions.completeTodoRequest(e)),
  doClearApiStatus: (e) => dispatch(ToDoActions.clearApiStatus(e)),
  doSortList: (e) => dispatch(ToDoActions.sortList(e)),
  doFilterList: (e) => dispatch(ToDoActions.filterList(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
