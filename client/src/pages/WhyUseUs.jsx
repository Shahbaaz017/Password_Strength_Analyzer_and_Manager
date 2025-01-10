import React from 'react';
import StarsBackground from './StarsBackground';
import 'bootstrap/dist/css/bootstrap.min.css';

const WhyUseUs = () => {
  return (
    <div>
            <StarsBackground />
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-white">Why Use Our Password Strength Analyzer and Manager?</h1>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Comprehensive Password Strength Analysis</h5>
            <p className="text-white">
              Get in-depth analysis of your passwords, with real-time feedback to ensure maximum security.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">User-Friendly Password Manager</h5>
            <p className="text-white">
              Securely store and manage your passwords across devices with ease and confidence.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Advanced Encryption Technology</h5>
            <p className="text-white">
              Your data is encrypted using industry-leading techniques like AES-256 to guarantee privacy.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Cross-Platform Compatibility</h5>
            <p className="text-white">
              Access your password manager on web, mobile, and desktop platforms anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Data Breach Monitoring</h5>
            <p className="text-white">
              Get notified instantly if your credentials appear in known breaches, enabling quick action.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Customizable Security Features</h5>
            <p className="text-white">
              Enhance security with multi-factor authentication and other customizable features.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Educational Insights on Security</h5>
            <p className="text-white">
              Learn best practices for staying secure online with our insightful tips and resources.
            </p>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div>
            <h5 className="text-white">Free and Premium Plans</h5>
            <p className="text-white">
              Start for free, and upgrade for advanced features tailored for power users.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WhyUseUs;

