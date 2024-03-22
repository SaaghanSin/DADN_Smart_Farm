package com.example.loginapp;

import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.AppCompatButton;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class GoogleGmail extends AppCompatActivity {

    private boolean passwordShowing3 = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_google_gmail);
        final LinearLayout LogInButton = findViewById(R.id.LogInButton);
        LogInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(GoogleGmail.this,Login.class));
            }
        });
        final EditText GmailET = findViewById(R.id.GmailET);
        final EditText Password3ET = findViewById(R.id.Password3ET);
        final ImageView ShowpasswordButton3 = findViewById(R.id.ShowpasswordButton3);
        ShowpasswordButton3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(passwordShowing3){
                    passwordShowing3 = false;

                    Password3ET.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);
                    ShowpasswordButton3.setImageResource(R.drawable.show_pass);
                }
                else{
                    passwordShowing3 = true;

                    Password3ET.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
                    ShowpasswordButton3.setImageResource(R.drawable.hide_pass);
                }
                Password3ET.setSelection(Password3ET.length());
            }
        });
        final AppCompatButton SignInButton1 = findViewById(R.id.SignInButton1);
        SignInButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (GmailET.getText().toString().trim().isEmpty()){
                    Toast.makeText(GoogleGmail.this,"Enter gmail",Toast.LENGTH_SHORT).show();
                }
                else if (Password3ET.getText().toString().trim().isEmpty()){
                    Toast.makeText(GoogleGmail.this,"Enter password",Toast.LENGTH_SHORT).show();
                }
                else {
                    Toast.makeText(GoogleGmail.this,"Success",Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(GoogleGmail.this,RicardoMelos.class));
                }
            }
        });
    }
}