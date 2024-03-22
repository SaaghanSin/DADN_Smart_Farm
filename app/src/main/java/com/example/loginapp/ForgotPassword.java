package com.example.loginapp;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class ForgotPassword extends AppCompatActivity {

    private boolean passwordShowing1 = false;
    private boolean passwordShowing2 = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_forgot_password);
        final EditText EnterOTP = findViewById(R.id.EnterOTPET);
        final EditText Password1ET = findViewById(R.id.Password1ET);
        final EditText Password2ET = findViewById(R.id.Password2ET);
        final AppCompatButton ChangePasswordButton = findViewById(R.id.ChangePasswordButton);
        ChangePasswordButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String pass1 = Password1ET.getText().toString();
                String pass2 = Password2ET.getText().toString();
                if (EnterOTP.getText().toString().trim().isEmpty()){
                    Toast.makeText(ForgotPassword.this,"Enter OTP",Toast.LENGTH_SHORT).show();
                }
                else if (Password1ET.getText().toString().trim().isEmpty()){
                    Toast.makeText(ForgotPassword.this,"Enter new password",Toast.LENGTH_SHORT).show();
                }
                else if (Password2ET.getText().toString().trim().isEmpty()){
                    Toast.makeText(ForgotPassword.this,"Please confirm password",Toast.LENGTH_SHORT).show();
                }
                else if (!pass1.equals(pass2)){
                    Toast.makeText(ForgotPassword.this,"Passwords do not match",Toast.LENGTH_SHORT).show();
                }
                else {
                    Toast.makeText(ForgotPassword.this,"Success",Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(ForgotPassword.this,Login.class));
                }

            }
        });
        final ImageView ShowpasswordButton1 = findViewById(R.id.ShowpasswordButton1);
        ShowpasswordButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(passwordShowing1){
                    passwordShowing1 = false;

                    Password1ET.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                    ShowpasswordButton1.setImageResource(R.drawable.show_pass);
                }
                else{
                    passwordShowing1 = true;

                    Password1ET.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
                    ShowpasswordButton1.setImageResource(R.drawable.hide_pass);
                }
                Password1ET.setSelection(Password1ET.length());
            }
        });
        final ImageView ShowpasswordButton2 = findViewById(R.id.ShowpasswordButton2);
        ShowpasswordButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(passwordShowing2){
                    passwordShowing2 = false;

                    Password2ET.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                    ShowpasswordButton2.setImageResource(R.drawable.show_pass);
                }
                else{
                    passwordShowing2 = true;

                    Password2ET.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
                    ShowpasswordButton2.setImageResource(R.drawable.hide_pass);
                }
                Password2ET.setSelection(Password2ET.length());
            }
        });

        Password2ET.addTextChangedListener(new TextWatcher() {
            @Override
            public void afterTextChanged(Editable s) {
                String pass1 = Password1ET.getText().toString();
                String pass2 = Password2ET.getText().toString();

                if (!pass1.equals(pass2)) {
                    Password2ET.setError("Password Mismatch");
                }
            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {}
        });

        final LinearLayout PhoneVerificationButton2 = findViewById(R.id.PhoneVerificationButton2);
        PhoneVerificationButton2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(ForgotPassword.this,PhoneForForgotPass.class));
            }
        });
    }
}