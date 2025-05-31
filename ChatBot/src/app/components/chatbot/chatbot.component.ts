import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent{
  userInput = '';
  messages: { text: string; sender: 'user' | 'bot'; options?: string[] }[] = [];
  showDefaultMessage = true;


  handleOptionClick(option: string) {
    this.messages.push({ text: option, sender: 'user' });
    setTimeout(() => {
      const urlMap: Record<string, string> = {
        'About':'https://drait.edu.in/home/Founder',
        'Abmission':'https://drait.edu.in/home/Programs-Offered',
        'Departments':'https://drait.edu.in/home/Information-Science-and-Engineering-Overview',
        'Academics':'https://drait.edu.in/home/Academic-Regulations',
        'Results': 'http://results.drait.in/',
        'Fee Structure': 'https://drait.edu.in/home/Fee-Structure',
        'Online Payment': 'http://onlinepay.drait.in/',
        'Placements': 'https://drait.edu.in/home/About-Placement-Cell',
      };

      if (urlMap[option]) {
        window.open(urlMap[option], '_blank');
        this.messages.push({ text: `Opening ${option} page for you.`, sender: 'bot' });
        this.sendMessage();
      } else {
        this.messages.push({ text: `You selected: ${option}`, sender: 'bot' });
      }
    }, 600);
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.showDefaultMessage = false;
    const input = this.userInput.trim().toLowerCase();
    this.messages.push({ text: this.userInput, sender: 'user' });

    if (input.includes('hi') || input.includes('hello')) {
      setTimeout(() => {
        this.messages.push({
          text: "Hello! How can I assist you today, AIT'ian?",
          sender: 'bot',
          options: ['About','Abmission','Departments','Academics','Results', 'Fee Structure', 'Online Payment', 'Placements']
        });
      }, 600);
    } else {
      setTimeout(() => {
        this.messages.push({ text: `I'm sorry, but I couldn't process your request. Could you please try again?`, sender: 'bot' });
      }, 600);
    }

    this.userInput = '';
  }
}
