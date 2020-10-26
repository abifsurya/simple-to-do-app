import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import {Picker} from '@react-native-community/picker';
import NavHeader from '../Components/NavHeader';
import LoadingView from '../Components/View/LoadingView';
import Toast from 'react-native-easy-toast';
import styles from './Styles/AddEditScreenStyle';

// Redux
import ToDoActions, {ToDoSelectors} from '../Redux/ToDoRedux';

export class AddEditScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.navigation.getParam('title'),
      desc: this.props.navigation.getParam('desc'),
      category: this.props.navigation.getParam('category') || 'Personal',
      id: this.props.navigation.getParam('id'),
      formError: false,
      viewMode: this.props.navigation.getParam('viewMode'),
    };
  }

  componentWillUnmount() {
    this.setState({formError: false});
  }

  componentDidUpdate() {
    if (this.props.apiStatus.type) {
      if (this.props.apiStatus.type === 'saveForm') {
        this.refs.toast.show('To Do Added');
        this.props.navigation.goBack();
      } else if (this.props.apiStatus.type === 'editForm') {
        this.refs.toast.show('To Do Edited');
        this.props.navigation.goBack();
      }
      this.props.doClearApiStatus();
    }
  }

  onSaveToDo = () => {
    if (this.state.title === undefined || this.state.title === null) {
      this.setState({formError: true});
    } else {
      if (this.state.id) {
        this.props.doEditTodo({
          title: this.state.title,
          desc: this.state.desc,
          category: this.state.category,
          id: this.state.id,
        });
      } else {
        this.props.doSaveTodo({
          title: this.state.title,
          desc: this.state.desc,
          category: this.state.category,
        });
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavHeader
          title={`${this.props.navigation.getParam('headerTitle')} To-Do`}
          iconName={this.state.viewMode ? null : 'check'}
          onIconPress={this.onSaveToDo}
        />
        <View style={styles.container}>
          <Text style={styles.titleInputText}>What To Do:</Text>
          <TextInput
            style={{...styles.titleInputBox, fontWeight: 'bold'}}
            value={this.state.title}
            onChangeText={(title) => this.setState({title})}
            placeholder={this.state.formError ? 'Please fill this field' : null}
            placeholderTextColor="red"
            editable={!this.state.viewMode}
          />

          <View style={styles.divider} />

          <Text style={styles.titleInputText}>Description:</Text>
          <View style={styles.titleDescBox}>
            <TextInput
              style={{borderWidth: 0, padding: 0}}
              multiline
              value={this.state.desc}
              onChangeText={(desc) => this.setState({desc})}
              editable={!this.state.viewMode}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.titleInputText}>Category</Text>
          <Picker
            enabled={!this.state.viewMode}
            selectedValue={this.state.category}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({category: itemValue})
            }>
            {this.props.categoryList.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
        <LoadingView loading={this.props.fetching} />
        <Toast ref="toast" poisition="bottom" />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  categoryList: ToDoSelectors.selectCategoryList(state),
  fetching: ToDoSelectors.selectFetching(state),
  apiStatus: ToDoSelectors.selectApiStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  doSaveTodo: (e) => dispatch(ToDoActions.saveTodoRequest(e)),
  doEditTodo: (e) => dispatch(ToDoActions.editTodoRequest(e)),
  doClearApiStatus: (e) => dispatch(ToDoActions.clearApiStatus(e)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditScreen);
