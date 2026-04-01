import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newTitle = '';
  newContent = '';
  loading = signal(false);
  showForm = signal(false);
  errorMessage = '';

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading.set(true);
    this.notesService.getNotes().subscribe({
      next: (data) => {
        this.notes = Array.isArray(data) ? data : [];
        this.loading.set(false);
      },
      error: () => {
        this.notes = [];
        this.loading.set(false);
      },
    });
  }

  createNote(): void {
    if (!this.newTitle.trim() || !this.newContent.trim()) {
      this.errorMessage = 'Completa título y contenido';
      return;
    }

    console.log('Aqui estoy', this.showForm);

    this.errorMessage = '';
    this.notesService.createNote({ title: this.newTitle, content: this.newContent }).subscribe({
      next: (note) => {
        this.notes.push(note);
        this.newTitle = '';
        this.newContent = '';
        this.showForm.set(false);
      },
      error: () => {
        this.errorMessage = 'Error al crear la nota';
      },
    });
  }

  toggleForm(): void {
    this.showForm.set(!this.showForm());
    this.errorMessage = '';
  }

  logout(): void {
    this.authService.logout();
  }
}
