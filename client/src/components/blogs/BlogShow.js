import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBlog } from "../../actions";

class BlogShow extends Component {
  componentDidMount() {
    console.log('BlogShow component mounted');
    this.props.fetchBlog(this.props.match.params._id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blog !== this.props.blog) {
      console.log('BlogShow component updated with new blog data:', this.props.blog);
    }
  }

  renderImage() {
    console.log('Rendering image with props:', this.props);
    if (this.props.blog && this.props.blog.imageUrl) {
      const imageUrl = `https://images-blog-node.s3.us-east-1.amazonaws.com/${this.props.blog.imageUrl}`;
      console.log('Image URL:', imageUrl);
      return (
        <img
          src={imageUrl}
          alt="blog"
          onError={(e) => { 
            console.error('Image failed to load:', imageUrl);
            e.target.onerror = null; 
            e.target.src = 'fallback-image-url'; 
          }}
        />
      );
    } else {
      console.warn('No image URL found');
      return (<p>No image</p>);
    }
  }

  render() {
    console.log('Rendering BlogShow component with blog:', this.props.blog);
    if (!this.props.blog) {
      return "";
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
