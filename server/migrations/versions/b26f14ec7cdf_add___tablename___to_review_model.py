"""Add __tablename__ to Review model

Revision ID: b26f14ec7cdf
Revises: ebe0ab075960
Create Date: 2024-02-12 21:38:50.168537

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b26f14ec7cdf'
down_revision = 'ebe0ab075960'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('igdb_game_id', sa.Integer(), nullable=False),
    sa.Column('difficulty', sa.Integer(), nullable=False),
    sa.Column('graphics', sa.Integer(), nullable=False),
    sa.Column('gameplay', sa.Integer(), nullable=False),
    sa.Column('storyline', sa.Integer(), nullable=False),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_reviews_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('review')
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index('ix_users_username')
        batch_op.create_index(batch_op.f('ix_users_email'), ['email'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_users_email'))
        batch_op.create_index('ix_users_username', ['username'], unique=1)

    op.create_table('review',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('igdb_game_id', sa.INTEGER(), nullable=False),
    sa.Column('difficulty', sa.INTEGER(), nullable=False),
    sa.Column('graphics', sa.INTEGER(), nullable=False),
    sa.Column('gameplay', sa.INTEGER(), nullable=False),
    sa.Column('storyline', sa.INTEGER(), nullable=False),
    sa.Column('review', sa.TEXT(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_review_user_id_users'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('reviews')
    # ### end Alembic commands ###
