import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newTitle = '';
  newContent = '';
  loading = false;
  showForm = false;
  errorMessage = '';

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    this.notesService.getNotes().subscribe({
      next: (data) => {
        this.notes = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => {
        this.notes = [];
        this.loading = false;
      },
    });
  }

  createNote(): void {
    if (!this.newTitle.trim() || !this.newContent.trim()) {
      this.errorMessage = 'Completa título y contenido';
      return;
    }

    this.errorMessage = '';
    this.notesService.createNote({ title: this.newTitle, content: this.newContent }).subscribe({
      next: (note) => {
        this.notes.push(note);
        this.newTitle = '';
        this.newContent = '';
        this.showForm = false;
      },
      error: () => {
        this.errorMessage = 'Error al crear la nota';
      },
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.errorMessage = '';
  }

  logout(): void {
    this.authService.logout();
  }
}
