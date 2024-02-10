from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('first_name', sa.String(30), nullable=False),
        sa.Column('last_name', sa.String(30), nullable=False),
        sa.Column('email', sa.String(100), nullable=False, unique=True),
        sa.Column('username', sa.String(40), nullable=False, unique=True),
        sa.Column('password_hash', sa.String(128), nullable=False)
    )

def downgrade():
    op.drop_table('users')