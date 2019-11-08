import React from 'react';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Button,
  Upload,
  Input,
  Icon,
  DatePicker,
} from 'antd';

import './NewGroup.css';

const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;

const schools = ['경희대학교', '성균관대학교', '서울대학교', '고려대학교', '한양대학교', '중앙대학교', '경기대학교', '동국대학교', '세종대학교', '포항공과대학교', '명지대학교', '인천대학교', '인하대학교', '이화여자대학교', '서강대학교', '서울시립대학교', '단국대학교', '우송대학교'];

const rangeConfig = {
  rules: [{ type: 'array', required: true, message: '여행 일정을 반드시 입력해주세요!' }],
};

class NewGroupPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className="new-group-page">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="여행 이름" hasFeedback>
            {getFieldDecorator('여행 이름', {
              rules: [
                { required: true, message: '여행 이름을 반드시 입력해주세요.', type: 'string' },
              ],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item label="모든학교 참여 가능">
            {getFieldDecorator('모든학교 참여 가능', { valuePropName: 'checked' })(<Switch />)}
          </Form.Item>

          <Form.Item label="참여학교">
            {getFieldDecorator('참여학교', {
              rules: [
                { required: true, message: '여행에 참가할 수 있는 모든 학교를 선택 해 주세요.', type: 'array' },
              ],
            })(
              <Select mode="multiple" placeholder="여행에 참가할 모든 학교를 선택해 주세요.">
                {schools.map(school => <Option value={school}>{school}</Option>)}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="여행 일정">
            {getFieldDecorator('여행 일정', rangeConfig)(<RangePicker />)}
          </Form.Item>

          <Form.Item label="전체 인원수">
            {getFieldDecorator('전체 인원수', { initialValue: 0 })(<InputNumber min={2} max={30} />)}
            <span className="ant-form-text"> 명</span>
          </Form.Item>

          <Form.Item label="대표이미지">
            {getFieldDecorator('대표이미지', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text" style={{ fontSize: '15px'}}>업로드 할 이미지를 드래그 해 주세요.</p>
                <p className="ant-upload-hint">이미지 크기는 최대 10MB까지 가능합니다.</p>
              </Upload.Dragger>,
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit" style={{display: 'block', marginLeft: 'auto', marginTop: '20px'}}>
              등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNewGroupPage = Form.create({ name: 'validate_other' })(NewGroupPage);

export default WrappedNewGroupPage;
